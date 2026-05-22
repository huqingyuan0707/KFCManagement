import request from '@/utils/request';

export interface IStatusCounts {
  pending: number;
  preparing: number;
  waiting: number;
  completed: number;
  cancelled: number;
}

export interface IDashboardStats {
  todayOrders: number;
  todayRevenue: number;
  burgerSales: number;
  pendingOrders: number;
  verificationRate: number;
  orderGrowth: number;
  revenueGrowth: number;
  statusCounts: IStatusCounts;
}

export interface IRecentOrder {
  id: number;
  orderNo: string;
  items: string;
  amount: number;
  status: string;
  createTime: string;
}

export interface IHotProduct {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
}

export interface IStockWarning {
  id: number;
  name: string;
  current: number;
  threshold: number;
  unit: string;
  level: 'urgent' | 'warning';
}

export interface IDashboardResponse {
  stats: IDashboardStats;
  recentOrders: IRecentOrder[];
  hotProducts: IHotProduct[];
  stockWarnings: IStockWarning[];
}

export const getDashboardStatistics = async (): Promise<IDashboardResponse> => {
  try {
    console.log('Loading dashboard data...');
    return getMockDashboardData();
  } catch (error) {
    console.error('Get dashboard statistics error:', error);
    return getMockDashboardData();
  }
};

const getMockDashboardData = (): IDashboardResponse => {
  const now = new Date();
  return {
    stats: {
      todayOrders: 156,
      todayRevenue: 28560,
      burgerSales: 423,
      pendingOrders: 8,
      verificationRate: 94,
      orderGrowth: 12.5,
      revenueGrowth: 8.3,
      statusCounts: {
        pending: 5,
        preparing: 3,
        waiting: 2,
        completed: 140,
        cancelled: 6
      }
    },
    recentOrders: [
      { id: 1, orderNo: 'KFC20241201001', items: '香辣鸡腿堡+可乐+薯条', amount: 35.00, status: '待接单', createTime: now.toISOString() },
      { id: 2, orderNo: 'KFC20241201002', items: '双层牛肉堡套餐', amount: 45.90, status: '制作中', createTime: new Date(now.getTime() - 5 * 60000).toISOString() },
      { id: 3, orderNo: 'KFC20241201003', items: '奥尔良烤鸡腿堡+九珍果汁', amount: 32.50, status: '待取餐', createTime: new Date(now.getTime() - 10 * 60000).toISOString() },
      { id: 4, orderNo: 'KFC20241201004', items: '全家桶套餐', amount: 129.00, status: '已完成', createTime: new Date(now.getTime() - 15 * 60000).toISOString() },
      { id: 5, orderNo: 'KFC20241201005', items: '原味鸡+蛋挞', amount: 28.00, status: '已完成', createTime: new Date(now.getTime() - 20 * 60000).toISOString() },
      { id: 6, orderNo: 'KFC20241201006', items: '新奥尔良鸡腿堡+玉米棒', amount: 36.50, status: '制作中', createTime: new Date(now.getTime() - 25 * 60000).toISOString() },
      { id: 7, orderNo: 'KFC20241201007', items: '香辣鸡翅+冰爽柠檬茶', amount: 22.00, status: '待接单', createTime: new Date(now.getTime() - 30 * 60000).toISOString() },
      { id: 8, orderNo: 'KFC20241201008', items: '老北京鸡肉卷+土豆泥', amount: 29.50, status: '待接单', createTime: new Date(now.getTime() - 35 * 60000).toISOString() },
      { id: 9, orderNo: 'KFC20241201009', items: '深海鳕鱼堡+圣代', amount: 38.00, status: '已完成', createTime: new Date(now.getTime() - 40 * 60000).toISOString() },
      { id: 10, orderNo: 'KFC20241201010', items: '超值午餐套餐', amount: 25.90, status: '已完成', createTime: new Date(now.getTime() - 45 * 60000).toISOString() }
    ],
    hotProducts: [
      { id: 1, name: '香辣鸡腿堡', category: '香辣汉堡', sales: 156, revenue: 4680 },
      { id: 2, name: '新奥尔良鸡腿堡', category: '经典汉堡', sales: 128, revenue: 3840 },
      { id: 3, name: '双层牛肉堡', category: '经典汉堡', sales: 98, revenue: 4410 },
      { id: 4, name: '奥尔良烤翅', category: '小食配餐', sales: 87, revenue: 2088 },
      { id: 5, name: '薯条(中)', category: '小食配餐', sales: 82, revenue: 1148 },
      { id: 6, name: '原味鸡', category: '小食配餐', sales: 76, revenue: 1520 },
      { id: 7, name: '百事可乐(中)', category: '饮品甜品', sales: 72, revenue: 576 },
      { id: 8, name: '老北京鸡肉卷', category: '经典汉堡', sales: 65, revenue: 1950 },
      { id: 9, name: '蛋挞(6个)', category: '饮品甜品', sales: 58, revenue: 2030 },
      { id: 10, name: '九珍果汁', category: '饮品甜品', sales: 45, revenue: 675 }
    ],
    stockWarnings: [
      { id: 1, name: '面包胚', current: 50, threshold: 100, unit: '个', level: 'urgent' },
      { id: 2, name: '生菜', current: 30, threshold: 80, unit: '份', level: 'urgent' },
      { id: 3, name: '番茄酱', current: 20, threshold: 50, unit: '瓶', level: 'warning' },
      { id: 4, name: '芝士片', current: 45, threshold: 60, unit: '片', level: 'warning' }
    ]
  };
}

export default {
  getDashboardStatistics
};