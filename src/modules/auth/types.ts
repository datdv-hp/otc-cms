export type IUserProfile = {
  id: string | number;
  fullname: string;
  username: string;
  created_at?: Date;
  updated_at?: Date;
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
