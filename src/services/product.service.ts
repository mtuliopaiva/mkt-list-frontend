import { apiRequest } from "../services/api.service";

export async function createProduct(CreateProductDto: CreateProductDto) {
  return apiRequest<ReadProductDto>(
    "post",
    "/product/create",
    CreateProductDto
  );
}

export async function getProductsByUuid(checklistUuid: string) {
  const url = `/products/find-by-uuid?uuid=${checklistUuid}`;
  return apiRequest<ReadProductDto>("get", url);
}

export async function getProductsPattern() {
  const url = `/products/find-by-pattern`;
  return apiRequest<ReadProductDto>("get", url);
}

export async function updateProducts(
  checklistUuid: string,
  updateProducts: UpdateProductDto
) {
  return apiRequest<ReadProductDto>(
    "put",
    `/products/update?uuid=${checklistUuid}`,
    updateProducts
  );
}

export async function listProductsAndSearch(
  page: number,
  itemsPerPage: number,
  search: string
) {
  return apiRequest<ListProductDto>(
    "get",
    `/product/list?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`
  );
}