import { apiRequest } from "../services/api.service";

export async function createCategory(createCategoryDto: CreateCategoryDto) {
  return apiRequest<ReadCategoryDto>(
    "post",
    "/category/create",
    createCategoryDto
  );
}

export async function getCategoryByUuid(categoryUuid: string) {
  const url = `/category/find-by-uuid?uuid=${categoryUuid}`;
  return apiRequest<ReadCategoryDto>("get", url);
}

export async function updateCategory(
  categoryUuid: string,
  updateCategory: UpdateCategoryDto
) {
  return apiRequest<ReadCategoryDto>(
    "put",
    `/category/update?uuid=${categoryUuid}`,
    updateCategory
  );
}

export async function listCategoriesAndSearch(
  page: number,
  itemsPerPage: number,
  search: string
) {
  return apiRequest<ListCategoryDto>(
    "get",
    `/category/list?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`
  );
}