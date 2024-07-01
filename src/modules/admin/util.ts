import { IResponseAdminDTO } from './dto/response.admin-dto';
import { IAdmin } from './type';

export const toAdmin = (params: IResponseAdminDTO): IAdmin => {
  return {
    id: params.id,
    createdAt: params.created_at,
    fullname: params.fullname,
    username: params.username,
    status: params.status
  };
};

export const toAdminList = (params: IResponseAdminDTO[]): IAdmin[] => {
  return params.map(toAdmin);
};
