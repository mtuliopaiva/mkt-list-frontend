type AuthLoginDto = {
    email: string;
    password: string;
  };
  
  type AuthForgotPasswordDto = {
    email: string;
  };
  
  type AuthResetPasswordDto = {
    password: string;
    token: string;
  };
  
  type VerifyAuthDto = {
    access_token: string;
    userData: ReadUsersDto;
  };
  
  type SucessAuthDto = {
    sucess: boolean;
    user?: ReadUsersDto;
    errorMessage?: string;
  };