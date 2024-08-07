import { apiRequest } from "./api.service";

export async function login(authLogin: AuthLoginDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/login`, authLogin);
}

export async function register(createUser: CreateUsersDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/register`, createUser);
}

export async function forgotPassword(authForgotPassword: AuthForgotPasswordDto) {
  return apiRequest<SucessAuthDto>("post", `/auth/forgot-password`, authForgotPassword);
}

export async function resetPassword(authResetPassword: AuthResetPasswordDto) {
  return apiRequest<SucessAuthDto>("post", `/auth/reset-password`, authResetPassword);
}

export async function verifyToken(): Promise<ReadUsersDto | undefined> {
  try {
    const response = await apiRequest<ReadUsersDto>("get", "/auth/verify-token");

    if (response) {
      return response;
    } else {
      throw new Error("Falha na requisição");
    }
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
  }
}
