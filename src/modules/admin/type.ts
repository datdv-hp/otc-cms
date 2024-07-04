export type IAdmin = {
  id: number;
  fullname: string;
  username: string;
  createdAt: Date | string;
};

export type IAdminForm = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
};
