import { get, post, put, del } from '@/utils/request';

export interface IOrder {
  id: number;
  orderNo: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: number;
  paymentMethod: string;
  createTime: string;
  updateTime: string;
}

export interface IOrderListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
}

export interface IOrderListResponse {
  list: IOrder[];
  total: number;
  page: number;
  pageSize: number;
}

export const getOrderList = (params: IOrderListParams): Promise<IOrderListResponse> => {
  return get('/order/list', params);
};

export const getOrderDetail = (id: number): Promise<IOrder> => {
  return get(`/order/detail/${id}`);
};

export const createOrder = (data: Partial<IOrder>): Promise<IOrder> => {
  return post('/order/create', data);
};

export const updateOrder = (id: number, data: Partial<IOrder>): Promise<IOrder> => {
  return put(`/order/update/${id}`, data);
};

export const deleteOrder = (id: number): Promise<void> => {
  return del(`/order/delete/${id}`);
};

export const exportOrders = (params: IOrderListParams): Promise<Blob> => {
  return get('/order/export', params) as unknown as Promise<Blob>;
};

export const getOrderStatistics = (): Promise<unknown> => {
  return get('/order/statistics');
};