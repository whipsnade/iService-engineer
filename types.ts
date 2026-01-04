export enum OrderStatus {
    PENDING = 'PENDING',       // 待接单
    TO_VISIT = 'TO_VISIT',     // 待上门
    IN_PROGRESS = 'IN_PROGRESS', // 处理中
    ON_HOLD = 'ON_HOLD',       // 停表中
    AFTER_SALES = 'AFTER_SALES', // 售后中
    COMPLETED = 'COMPLETED'    // 已完成
  }
  
  export interface WorkOrder {
    id: string;
    storeName: string;
    address: string;
    distance: string;
    faultDescription: string;
    status: OrderStatus;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    startTime?: string;
    lat: number;
    lng: number;
    type: string; // e.g., HVAC, Plumbing, Network
    afterSalesStatus?: string; // e.g., "Pending Review", "Parts Ordered"
  }
  
  export interface EngineerProfile {
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    company: string;
    todayOrders: number;
    balance: number;
    creditScore: number;
    satisfactionCount: number;
    complaintCount: number;
  }
  
  export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
    attachedOrderId?: string;
  }
  