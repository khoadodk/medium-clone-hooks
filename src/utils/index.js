import { parse } from 'query-string';

export const limit = 10;

export const getPaginator = search => {
  // articles?page=2&offset=10&limit=10
  const parsedSearch = parse(search);
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset = currentPage * limit - limit;
  return { currentPage, offset };
};
