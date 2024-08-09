type CreateCategoryDto = {
  name: string;
}

type UpdateCategoryDto = {
  name: string;
}

type ReadCategoryDto = {
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type ListCategoryDto = {
  data: ReadCategoryDto[];
  total: number;
}