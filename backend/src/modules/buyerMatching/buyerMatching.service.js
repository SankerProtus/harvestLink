import { searchMatches as searchMatchesRepo } from "./buyerMatching.repository.js";
import { toMatchSearchResponse } from "./buyerMatching.mapper.js";
import { MATCH_SORT_ORDER } from "./buyerMatching.constants.js";
import { getRatingSummaryForFarmers } from "../reviews/reviews.service.js";

export async function searchMatches(filters) {
  const { page, limit, ...rest } = filters;
  const skip = (page - 1) * limit;
  const take = limit;

  const { items, totalCount } = await searchMatchesRepo({
    ...rest,
    skip,
    take,
  });

  const farmerIds = [...new Set(items.map((listing) => listing.farmerId))];
  const ratingSummaryByFarmerId = await getRatingSummaryForFarmers(farmerIds);

  return toMatchSearchResponse({
    matches: items,
    page,
    limit,
    total: totalCount,
    ratingSummaryByFarmerId,
  });
}
