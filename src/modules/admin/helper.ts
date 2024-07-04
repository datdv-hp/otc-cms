import { IRequestCreateAdminFormDTO, IRequestUpdateAdminFormDTO } from './dto/request.admin-dto';
import { IResponseAdminDTO } from './dto/response.admin-dto';
import { IAdmin, IAdminForm } from './type';

export const toAdmin = (params: IResponseAdminDTO): IAdmin => {
  return {
    id: params.id,
    createdAt: params.created_at,
    fullname: params.fullname,
    username: params.username
  };
};

export const toAdminList = (params: IResponseAdminDTO[]): IAdmin[] => {
  return params.map(toAdmin);
};

export const toRequestCreateAdminFormDTO = (params: IAdminForm): IRequestCreateAdminFormDTO => {
  return {
    fullname: params.fullname,
    username: params.username,
    password: params.password
  };
};

export const toRequestUpdateAdminFormDTO = (params: IAdminForm): IRequestUpdateAdminFormDTO => {
  return {
    fullname: params.fullname,
    username: params.username,
    password: params.password
  };
};
