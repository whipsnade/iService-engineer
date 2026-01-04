import { OrderStatus, WorkOrder, EngineerProfile } from './types';

export const MOCK_PROFILE: EngineerProfile = {
  name: "Alex Engineer",
  avatarUrl: "https://picsum.photos/200",
  isOnline: true,
  company: "TechFix Solutions",
  todayOrders: 5,
  balance: 145.50,
  creditScore: 98,
  satisfactionCount: 420,
  complaintCount: 0
};

export const MOCK_ORDERS: WorkOrder[] = [
  {
    id: "WO-29384",
    storeName: "Tech Park Bldg A",
    address: "1024 Innovation Dr, Floor 1",
    distance: "0.8 mi",
    faultDescription: "Elevator Door Jam - Main Lobby. Unit is unresponsive to reset.",
    status: OrderStatus.IN_PROGRESS,
    priority: "High",
    startTime: "45m ago",
    lat: 37.7749,
    lng: -122.4194,
    type: "Elevator"
  },
  {
    id: "WO-8852",
    storeName: "Northside Grocery #118",
    address: "8842 Market St, Downtown",
    distance: "2.4 mi",
    faultDescription: "Cooling leak reported near dairy section. Temperature rising.",
    status: OrderStatus.TO_VISIT,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4094,
    type: "Refrigeration"
  },
  {
    id: "WO-1029",
    storeName: "City Center Mall",
    address: "500 Main St, 3rd Floor",
    distance: "5.1 mi",
    faultDescription: "POS Terminal #4 network connectivity intermittent.",
    status: OrderStatus.PENDING,
    priority: "Low",
    lat: 37.7649,
    lng: -122.4294,
    type: "IT/Network"
  },
  {
    id: "WO-9921",
    storeName: "Westside Clinic",
    address: "1200 Health Blvd",
    distance: "12.0 mi",
    faultDescription: "HVAC Unit 4B making loud grinding noises.",
    status: OrderStatus.PENDING,
    priority: "Critical",
    lat: 37.7549,
    lng: -122.4394,
    type: "HVAC"
  },
  {
    id: "WO-4432",
    storeName: "Burger Joint #55",
    address: "99 Fast Food Ln",
    distance: "1.2 mi",
    faultDescription: "Fryer thermostat calibration required.",
    status: OrderStatus.ON_HOLD,
    priority: "Medium",
    lat: 37.7949,
    lng: -122.3994,
    type: "Kitchen Equip"
  },
  {
    id: "WO-3321",
    storeName: "Coffee House Deluxe",
    address: "42 Bean St",
    distance: "0.5 mi",
    faultDescription: "Espresso machine group head leaking.",
    status: OrderStatus.AFTER_SALES,
    priority: "High",
    afterSalesStatus: "Waiting for customer feedback",
    lat: 37.8049,
    lng: -122.4094,
    type: "Coffee Machine"
  },
  {
    id: "WO-1111",
    storeName: "Retail Store X",
    address: "101 Shopper Ave",
    distance: "3.0 mi",
    faultDescription: "Automatic door sensor malfunction.",
    status: OrderStatus.COMPLETED,
    priority: "Low",
    lat: 37.7749,
    lng: -122.4194,
    type: "Door Systems"
  }
];
