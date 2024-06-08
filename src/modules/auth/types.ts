export type IUserProfile = {
  id: string | number;
  fullname: string;
  username: string;
  email?: string;
  permissions: string[];
};

export type IUserPermission = {};

export type ISignInBody = {
  username: string;
  password: string;
};

export type IAuthTokens = {
  accessToken: string;
  refreshToken: string;
};
