import { get, post, put, del } from '@/utils/request';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  status: number;
  description: string;
  createTime: string;
}

export interface IProductListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  status?: number;
}

export interface IProductListResponse {
  list: IProduct[];
  total: number;
  page: number;
  pageSize: number;
}

export const getProductList = (params: IProductListParams): Promise<IProductListResponse> => {
  return get('/product/list', params);
};

export const getProductDetail = (id: number): Promise<IProduct> => {
  return get(`/product/detail/${id}`);
};

export const createProduct = (data: Partial<IProduct>): Promise<IProduct> => {
  return post('/product/create', data);
};

export const updateProduct = (id: number, data: Partial<IProduct>): Promise<IProduct> => {
  return put(`/product/update/${id}`, data);
};

export const deleteProduct = (id: number): Promise<void> => {
  return del(`/product/delete/${id}`);
};

export const exportProducts = (params: IProductListParams): Promise<Blob> => {
  return get('/product/export', params) as unknown as Promise<Blob>;
};