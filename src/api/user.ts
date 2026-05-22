import { get, post, put, del } from '@/utils/request';

export interface IUser {
  id: number;
  username: string;
  realName: string;
  email: string;
  phone: string;
  role: string;
  status: number;
  avatar: string;
  createTime: string;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  userInfo: IUser;
}

export interface IUserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  role?: string;
  status?: number;
}

export interface IUserListResponse {
  list: IUser[];
  total: number;
  page: number;
  pageSize: number;
}

export const login = (params: ILoginParams): Promise<ILoginResponse> => {
  return post('/auth/login', params);
};

export const logout = (): Promise<void> => {
  return post('/auth/logout');
};

export const getUserInfo = (): Promise<IUser> => {
  return get('/auth/userinfo');
};

export const getUserList = (params: IUserListParams): Promise<IUserListResponse> => {
  return get('/user/list', params);
};

export const createUser = (data: Partial<IUser>): Promise<IUser> => {
  return post('/user/create', data);
};

export const updateUser = (id: number, data: Partial<IUser>): Promise<IUser> => {
  return put(`/user/update/${id}`, data);
};

export const deleteUser = (id: number): Promise<void> => {
  return del(`/user/delete/${id}`);
};

export const resetPassword = (id: number, password: string): Promise<void> => {
  return put(`/user/reset-password/${id}`, { password });
};