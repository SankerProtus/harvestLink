import { useCallback } from "react";
import { Alert } from "../../../lib/alert.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useSavedListingIds,
  useSaveListing,
  useUnsaveListing,
} from "./savedListingHooks.js";

export function useToggleSaveListing() {
  const savedIds = useSavedListingIds();
  const { mutate: save } = useSaveListing();
  const { mutate: unsave } = useUnsaveListing();
  const saved = savedIds.data;

  const isSaved = useCallback((id) => saved?.has(id) ?? false, [saved]);

  const toggle = useCallback(
    (listing) => {
      const run = saved?.has(listing.id) ? unsave : save;
      run(listing.id, {
        onError: (err) =>
          Alert.alert("Couldn't update saved listings", getErrorMessage(err)),
      });
    },
    [saved, save, unsave],
  );

  return { isSaved, toggle, savedIds };
}