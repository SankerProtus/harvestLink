import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as marketplaceApi from "../../../api/marketplace.api.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { isOnline } from "../../../lib/networkMonitor.js";
import {
  createListing as createLocalListing,
  updateListing as updateLocalListing,
  getListingByRemoteId as getLocalListingByRemoteId,
  getPendingListings,
} from "../../../database/repositories/ListingRepository.js";
import { enqueue as enqueueOperation } from "../../../database/sync/SyncQueue.js";
import { OPERATION_TYPES } from "../../../database/sync/SyncEngine.js";
import { normalizeListingImageUrls } from "../../../../src/features/marketplace/lib/normalizeListingImageUrls.js";

export const marketplaceQueryKeys = {
  listingsRoot: ["marketplace", "listings"],
  listings: (filters) => [...marketplaceQueryKeys.listingsRoot, filters],
  listing: (listingId) => ["marketplace", "listing", listingId],
  myListings: ["marketplace", "myListings"],
};

export function useListings(filters) {
  return useQuery({
    queryKey: marketplaceQueryKeys.listings(filters),
    queryFn: () => marketplaceApi.searchListings(filters),
  });
}

export function useInfiniteListings(filters) {
  return useInfiniteQuery({
    queryKey: [...marketplaceQueryKeys.listingsRoot, "infinite", filters],
    queryFn: ({ pageParam }) =>
      marketplaceApi.searchListings({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  });
}

export function useListing(listingId) {
  return useQuery({
    queryKey: marketplaceQueryKeys.listing(listingId),
    queryFn: () => marketplaceApi.getListing(listingId),
    enabled: Boolean(listingId),
  });
}

export function useMyListings() {
  const { user } = useAuth();

  return useQuery({
    queryKey: marketplaceQueryKeys.myListings,
    queryFn: async () => {
      const remoteListings = await marketplaceApi.getMyListings();
      const pendingLocal = await getPendingListings();
      const myUnsyncedLocal = pendingLocal
        .filter((listing) => !listing.remoteId)
        .filter((listing) => !user?.id || listing.farmerId === user.id)
        .map((listing) => ({
          id: listing.localId,
          farmerId: listing.farmerId,
          title: listing.title,
          description: listing.description,
          cropType: listing.cropType,
          quantity: listing.quantity,
          quantityUnit: listing.quantityUnit,
          pricePerUnit: listing.pricePerUnit,
          location: listing.location,
          images: listing.images,
          status: listing.status,
          syncStatus: "pending",
          createdAt: listing.createdAt ?? new Date().toISOString(),
          updatedAt: listing.updatedAt ?? new Date().toISOString(),
        }));

      const syncedRemote = remoteListings.map((listing) => ({
        ...listing,
        syncStatus: "synced",
      }));

      return [...myUnsyncedLocal, ...syncedRemote];
    },

    refetchInterval: (query) => {
      const data = query.state.data;
      const hasPendingSync = data?.some(
        (listing) => listing.syncStatus === "pending",
      );
      return hasPendingSync ? 6000 : false;
    },
  });
}

// Mutations
export function useCreateListing() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (payload) => {
      const online = await isOnline();

      if (online) {
        const uploadedImages = await normalizeListingImageUrls(
          payload.images,
          marketplaceApi.uploadListingPhoto,
        );
        const remoteListing = await marketplaceApi.createListing({
          ...payload,
          images: uploadedImages,
        });

        try {
          await createLocalListing({
            remoteId: remoteListing.id,
            farmerId: remoteListing.farmerId,
            title: remoteListing.title,
            description: remoteListing.description,
            cropType: remoteListing.cropType,
            quantity: remoteListing.quantity,
            quantityUnit: remoteListing.quantityUnit,
            pricePerUnit: remoteListing.pricePerUnit,
            location: remoteListing.location,
            images: remoteListing.images,
            status: remoteListing.status,
            syncStatus: "synced",
            createdAt: remoteListing.createdAt,
            updatedAt: remoteListing.updatedAt,
          });
        } catch (localMirrorError) {
          console.warn(
            "Failed to mirror created listing into local storage; the listing was still created on the server.",
            localMirrorError,
          );
        }

        // Preserves the EXACT pre-existing online return shape
        // (the real backend Listing DTO), unchanged.
        return remoteListing;
      }

      // Offline path
      const localListing = await createLocalListing({
        farmerId: user?.id ?? null,
        title: payload.title,
        description: payload.description,
        cropType: payload.cropType,
        quantity: payload.quantity,
        quantityUnit: payload.quantityUnit,
        pricePerUnit: payload.pricePerUnit,
        location: payload.location,
        images: payload.images,
        status: "ACTIVE", // mirrors the backend's own creation default
        syncStatus: "pending",
      });

      await enqueueOperation({
        operationType: OPERATION_TYPES.CREATE_LISTING,
        entityType: "listing",
        entityLocalId: localListing.localId,
        payload,
      });

      return localListing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.myListings,
      });
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.listingsRoot,
      });
    },
  });
}

export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId, updates }) => {
      const online = await isOnline();

      if (online) {
        const normalizedUpdates = updates.images
          ? {
              ...updates,
              images: await normalizeListingImageUrls(
                updates.images,
                marketplaceApi.uploadListingPhoto,
              ),
            }
          : updates;

        const remoteListing = await marketplaceApi.updateListing(
          listingId,
          normalizedUpdates,
        );

        // Mirror into local storage if a local copy of this listing
        // exists (e.g. it was previously synced/cached); silently a
        // no-op if not — reads don't depend on local storage today.
        // Best-effort: the remote update already succeeded, so a local
        // mirroring failure must not be surfaced as an update failure.
        try {
          const localMatch = await getLocalListingByRemoteId(listingId);
          if (localMatch) {
            await updateLocalListing(localMatch.localId, {
              ...normalizedUpdates,
              status: remoteListing.status,
              syncStatus: "synced",
              updatedAt: remoteListing.updatedAt,
            });
          }
        } catch (localMirrorError) {
          console.warn(
            "Failed to mirror updated listing into local storage; the update was still applied on the server.",
            localMirrorError,
          );
        }

        // Preserves the EXACT pre-existing online return shape.
        return remoteListing;
      }

      // Offline path — listingId here is the listing's real remote
      // UUID (the same value the caller has always passed); this
      // only succeeds if that listing was already synced/cached
      // locally at some earlier point.
      const localMatch = await getLocalListingByRemoteId(listingId);
      if (!localMatch) {
        throw new Error(
          "This listing is not available locally for offline editing.",
        );
      }

      const updatedLocal = await updateLocalListing(localMatch.localId, {
        ...updates,
        syncStatus: "pending",
      });

      await enqueueOperation({
        operationType: OPERATION_TYPES.UPDATE_LISTING,
        entityType: "listing",
        entityLocalId: localMatch.localId,
        payload: updates,
      });

      return updatedLocal;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.listing(variables.listingId),
      });
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.myListings,
      });
    },
  });
}

export function useUpdateListingQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, quantity }) =>
      marketplaceApi.updateListingQuantity(listingId, quantity),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.listing(variables.listingId),
      });
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.myListings,
      });
    },
  });
}

export function useChangeListingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, status }) =>
      marketplaceApi.changeListingStatus(listingId, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.listing(variables.listingId),
      });
      queryClient.invalidateQueries({
        queryKey: marketplaceQueryKeys.myListings,
      });
    },
  });
}

export function useUploadListingPhoto() {
  return useMutation({
    mutationFn: (imageUri) => marketplaceApi.uploadListingPhoto(imageUri),
  });
}