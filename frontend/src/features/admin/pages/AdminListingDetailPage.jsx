import { Image, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../../../components/ui/AppText.jsx";
import { formatCurrency } from "../../../lib/currency.js";
import { getOrderStatusMeta } from "../../deliveryTracking/lib/orderStatus.js";
import { useAdminListing } from "../../../../../operations-detail-screens/Frontend/src/features/admin/hooks/adminHooks.js";
import {
  DetailScreen,
  Field,
  FieldGroup,
  HeroCard,
  NoteCard,
  PartyRow,
  formatDateTime,
  shortId,
  statusTone,
} from "../components/AdminDetailKit.jsx";
import {
  IconBubble,
  Row,
  SectionTitle,
  ageLabel,
  formatShortDate,
  humanize,
} from "../components/AdminUI.jsx";

export function AdminListingDetailPage() {
  const navigation = useNavigation();
  const { listingId } = useRoute().params;
  const query = useAdminListing(listingId);

  return (
    <DetailScreen
      eyebrow="Operations"
      title="Listing details"
      onBack={() => navigation.goBack()}
      query={query}
    >
      {(listing) => {
        const unit = humanize(listing.quantityUnit).toLowerCase();
        const flagged = listing.priceReviewRequired;
        const tone = flagged ? "accent" : statusTone(listing.status);

        const pills = [{ label: humanize(listing.status), tone: statusTone(listing.status) }];
        if (flagged) pills.push({ label: "Price flagged", tone: "accent" });
        if (listing.customCropName) pills.push({ label: "Custom crop", tone: "info" });

        return (
          <>
            <HeroCard
              icon="shopping-bag"
              tone={tone}
              title={listing.title}
              subtitle={[listing.crop?.name, listing.location].filter(Boolean).join(" · ")}
              pills={pills}
              amount={`${formatCurrency(listing.pricePerUnit)} / ${unit}`}
              amountCaption="Asking price"
            />

            {listing.images?.length ? (
              <>
                <SectionTitle title="Photos" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                  {listing.images.map((uri) => (
                    <Image
                      key={uri}
                      source={{ uri }}
                      accessibilityLabel="Listing photo"
                      className="w-28 h-28 rounded-xl mr-2 bg-line"
                    />
                  ))}
                </ScrollView>
              </>
            ) : null}

            {flagged ? (
              <View className="mt-4">
                <NoteCard
                  tone="accent"
                  text="This listing's price was flagged for review. It stays visible until an admin clears the flag from the Review tab."
                />
              </View>
            ) : null}

            <FieldGroup title="Listing">
              <Field label="Listing ID" value={shortId(listing.id)} />
              <Field label="Crop" value={listing.crop?.name} />
              <Field label="Category" value={humanize(listing.crop?.category)} />
              {listing.customCropName ? (
                <Field label="Custom crop name" value={listing.customCropName} />
              ) : null}
              <Field
                label="Quantity available"
                value={`${Number(listing.quantity)} ${unit}`}
              />
              <Field
                label="Price per unit"
                value={formatCurrency(listing.pricePerUnit)}
              />
              <Field label="Location" value={listing.location} />
              <Field
                label="Harvest date"
                value={listing.harvestDate ? formatShortDate(listing.harvestDate) : null}
              />
              <Field label="Listed" value={formatDateTime(listing.createdAt)} />
              <Field label="Last updated" value={formatDateTime(listing.updatedAt)} />
            </FieldGroup>

            {listing.description ? (
              <>
                <SectionTitle title="Description" />
                <View className="mx-5 bg-white rounded-2xl border border-line/60 p-4">
                  <Text selectable className="text-[13.5px] text-ink leading-5">
                    {listing.description}
                  </Text>
                </View>
              </>
            ) : null}

            <FieldGroup title="Engagement">
              <Field label="Orders" value={listing._count?.orders ?? 0} />
              <Field label="Expressed interest" value={listing._count?.interests ?? 0} />
              <Field label="Saved by buyers" value={listing._count?.savedBy ?? 0} />
            </FieldGroup>

            <FieldGroup title="Farmer">
              <PartyRow role="Farmer" party={listing.farmer} />
              <Field
                label="Account status"
                value={humanize(listing.farmer?.accountStatus)}
              />
            </FieldGroup>

            <FieldGroup title="Recent orders" empty="No orders have been placed on this listing.">
              {(listing.orders ?? []).map((order) => {
                const meta = getOrderStatusMeta(order.status);
                return (
                  <Row
                    key={order.id}
                    leading={<IconBubble name={meta.icon} tone={meta.tone} />}
                    title={order.buyer?.fullName ?? "Buyer"}
                    subtitle={`${Number(order.quantity)} ${unit} · ${ageLabel(order.createdAt)} ago`}
                    pill={{ label: meta.label, tone: meta.tone }}
                    onPress={() =>
                      navigation.navigate("AdminOrderDetail", { orderId: order.id })
                    }
                  />
                );
              })}
            </FieldGroup>
          </>
        );
      }}
    </DetailScreen>
  );
}
