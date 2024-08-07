type CreateProductDto = {
  name: string;
  price: number;
  categoryUuid: string;
  deletedAt?: Date;
}

type ReadProductDto = {
  uuid: string;
  name: string;
  price: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type ReadProductQuantityDto = {
  productId: string;
  quantity: number;
}

type ListProductDto = {
  data: ReadProductDto[];
  total: number;
}

type UpdateProductDto = {
  name?: string;
  price?: number;
  categoryId?: string;
  deletedAt?: Date;
}

