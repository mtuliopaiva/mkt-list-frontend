type ReadUsersDto = {
    uuid?: string;
    name?: string;
    email?: string;
    type?: string;
    roleUuid?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  
  type ListUsersDto = {
    data: ReadUsersDto[];
    total: number;
  };
  
  type CreateUsersDto = {
    uuid?: string;
    name?: string;
    email?: string;
    password?: string;
    roleUuid?: string;
  };
  
  type UpdateUsersDto = {
    name?: string;
    email?: string;
    password?: string;
    roleUuid?: string;
  };