import { OrderStatus, WorkOrder, EngineerProfile, Part } from './types';

export const MOCK_PROFILE: EngineerProfile = {
  name: "Alex Engineer",
  avatarUrl: "https://picsum.photos/200",
  isOnline: true,
  company: "TechFix Solutions",
  todayOrders: 5,
  balance: 145.50,
  creditScore: 98,
  satisfactionCount: 420,
  complaintCount: 0,
  certifications: [
    { name: "YUM", level: "S" },
    { name: "Starbucks", level: "A" },
    { name: "Burger King", level: "B" },
    { name: "Tesla Charging", level: "C" }
  ]
};

export const MOCK_ORDERS: WorkOrder[] = [
  {
    id: "WO-29384",
    storeName: "Tech Park Bldg A",
    storePhone: "+1 (555) 010-1024",
    address: "1024 Innovation Dr, Floor 1",
    distance: "0.8 mi",
    faultDescription: "Elevator Door Jam - Main Lobby. Unit is unresponsive to reset.",
    status: OrderStatus.IN_PROGRESS,
    priority: "High",
    startTime: "45m ago",
    lat: 37.7749,
    lng: -122.4194,
    type: "Elevator",
    attachments: [
        {
            id: 'att-1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'att-2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=200&auto=format&fit=crop'
        }
    ]
  },
  {
    id: "WO-8852",
    storeName: "Northside Grocery #118",
    storePhone: "+1 (555) 012-3456",
    address: "8842 Market St, Downtown",
    distance: "2.4 mi",
    faultDescription: "Cooling leak reported near dairy section. Temperature rising.",
    status: OrderStatus.TO_VISIT,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4094,
    type: "Refrigeration",
    attachments: [
        {
            id: 'att-3',
            type: 'video',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
            thumbnailUrl: 'https://images.unsplash.com/photo-1584622412117-b1cc5440e2b3?q=80&w=200&auto=format&fit=crop'
        }
    ]
  },
  {
    id: "WO-1029",
    storeName: "City Center Mall",
    storePhone: "+1 (555) 098-7654",
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
    storePhone: "+1 (555) 111-2222",
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
    storePhone: "+1 (555) 333-4444",
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
    storePhone: "+1 (555) 555-6666",
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
    storePhone: "+1 (555) 777-8888",
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

export const MOCK_PARTS: Part[] = [
    // Elevator
    { id: 'p-el-1', name: 'Main Control Board V2', type: 'Elevator', partPrice: 450.00, installationPrice: 150.00, shippingFee: 25.00 },
    { id: 'p-el-2', name: 'Door Sensor Kit', type: 'Elevator', partPrice: 120.00, installationPrice: 80.00, shippingFee: 15.00 },
    { id: 'p-el-3', name: 'Hydraulic Pump Seal', type: 'Elevator', partPrice: 35.00, installationPrice: 200.00, shippingFee: 10.00 },
    // Refrigeration
    { id: 'p-ref-1', name: 'Compressor Unit 5HP', type: 'Refrigeration', partPrice: 800.00, installationPrice: 300.00, shippingFee: 100.00 },
    { id: 'p-ref-2', name: 'Thermostat Digital', type: 'Refrigeration', partPrice: 60.00, installationPrice: 40.00, shippingFee: 10.00 },
    // IT/Network
    { id: 'p-it-1', name: 'Cat6 Ethernet Spool', type: 'IT/Network', partPrice: 120.00, installationPrice: 100.00, shippingFee: 20.00 },
    { id: 'p-it-2', name: 'Network Switch 24-Port', type: 'IT/Network', partPrice: 250.00, installationPrice: 50.00, shippingFee: 15.00 },
    // HVAC
    { id: 'p-hvac-1', name: 'Blower Motor', type: 'HVAC', partPrice: 180.00, installationPrice: 120.00, shippingFee: 30.00 },
    { id: 'p-hvac-2', name: 'Capacitor 45/5', type: 'HVAC', partPrice: 25.00, installationPrice: 60.00, shippingFee: 8.00 },
    // Kitchen Equip
    { id: 'p-kit-1', name: 'Heating Element', type: 'Kitchen Equip', partPrice: 85.00, installationPrice: 75.00, shippingFee: 12.00 },
    { id: 'p-kit-2', name: 'Fryer Basket', type: 'Kitchen Equip', partPrice: 45.00, installationPrice: 0.00, shippingFee: 15.00 },
    // Coffee Machine
    { id: 'p-cof-1', name: 'Group Head Gasket', type: 'Coffee Machine', partPrice: 8.00, installationPrice: 40.00, shippingFee: 5.00 },
    { id: 'p-cof-2', name: 'Water Pump Assembly', type: 'Coffee Machine', partPrice: 140.00, installationPrice: 90.00, shippingFee: 15.00 },
    // Door Systems
    { id: 'p-door-1', name: 'Motion Sensor Radar', type: 'Door Systems', partPrice: 210.00, installationPrice: 80.00, shippingFee: 10.00 },
];