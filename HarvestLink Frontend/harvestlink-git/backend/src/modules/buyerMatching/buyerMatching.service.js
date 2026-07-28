import { searchMatches as searchMatchesRepo } from "./buyerMatching.repository.js";
import { toMatchSearchResponse } from "./buyerMatching.mapper.js";
import { MATCH_SORT_ORDER } from "./buyerMatching.constants.js";

export async function searchMatches(filters) {
  const { page, limit, ...rest } = filters;
  const skip = (page - 1) * limit;
  const take = limit;

  const { items, totalCount } = await searchMatchesRepo({
    ...rest,
    skip,
    take,
  });

  return toMatchSearchResponse({
    matches: items,
    page,
    limit,
    total: totalCount,
  });
}
