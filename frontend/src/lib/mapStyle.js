// src/lib/mapStyle.js
//
// A MapLibre style JSON pointing at the public OpenStreetMap raster tile
// servers. No account, API key, or payment method required anywhere in
// this chain — this is the replacement for react-native-maps' implicit
// dependency on a Google Maps API key.
//
// OSM's tile servers are shared public infrastructure intended for
// light/moderate use (see https://operations.osmfoundation.org/policies/tiles/).
// That's a good fit for a student/small-scale delivery-tracking screen
// like this one. If HarvestLink's traffic grows enough that this becomes
// a concern, swap `tiles` below for a dedicated raster/vector provider —
// OpenFreeMap (https://openfreemap.org) is a good free, no-signup
// alternative that serves nicer-looking vector styles; MapTiler/Stadia
// Maps offer generous free tiers if a registered API key is acceptable.
// Nothing else in this file or its usage needs to change to swap tile
// sources later — only the `tiles` URL (and `attribution`, if required
// by the new provider's terms).
export const OSM_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
    },
  ],
};

// Rough visual equivalent of react-native-maps' `latitudeDelta`/
// `longitudeDelta` region sizing, translated to MapLibre's logarithmic
// zoom levels. MapLibre has no direct delta-based viewport API, so this
// is an approximation tuned to match the previous "close, walkable-area"
// framing (~0.05 delta) used on the delivery-location map.
export const DEFAULT_DELIVERY_MAP_ZOOM = 13;
