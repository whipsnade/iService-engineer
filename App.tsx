import React, { useState, useMemo } from 'react';
import { 
  Menu, 
  Search, 
  MessageSquare, 
  Bell, 
  CheckCircle,
  Clock,
  MapPin,
  PauseCircle,
  AlertTriangle,
  Scan
} from 'lucide-react';
import { OrderStatus, WorkOrder, EngineerProfile } from './types';
import { MOCK_ORDERS, MOCK_PROFILE } from './constants';
import Sidebar from './components/Sidebar';
import WorkOrderCard from './components/WorkOrderCard';
import ChatWidget from './components/ChatWidget';
import { CompleteJobModal, RepairGuideModal, NavigationModal, PartsSelectionModal } from './components/Modals';

const App: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.IN_PROGRESS);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const [isNavModalOpen, setNavModalOpen] = useState(false);
  const [isPartsModalOpen, setPartsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [profile, setProfile] = useState<EngineerProfile>(MOCK_PROFILE);

  // Derived State
  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => order.status === activeTab);
  }, [activeTab]);

  const activeOrdersForChat = useMemo(() => {
    return MOCK_ORDERS.filter(order => order.status === OrderStatus.IN_PROGRESS || order.status === OrderStatus.PENDING);
  }, []);

  // Handlers
  const handleAction = (action: string, order: WorkOrder) => {
    setSelectedOrder(order);
    switch (action) {
      case 'complete':
        setCompleteModalOpen(true);
        break;
      case 'guide':
        setGuideModalOpen(true);
        break;
      case 'navigate':
        setNavModalOpen(true);
        break;
      case 'parts':
        setPartsModalOpen(true);
        break;
      case 'support':
        setChatOpen(true);
        break;
      case 'accept':
      case 'confirm_arrival':
      case 'pause':
      case 'resume':
        console.log(`Action ${action} on order ${order.id}`);
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: OrderStatus.PENDING, label: 'To Accept', icon: <Clock size={16} /> },
    { id: OrderStatus.TO_VISIT, label: 'To Visit', icon: <MapPin size={16} /> },
    { id: OrderStatus.IN_PROGRESS, label: 'In Progress', icon: <CheckCircle size={16} /> },
    { id: OrderStatus.ON_HOLD, label: 'On Hold', icon: <PauseCircle size={16} /> },
    { id: OrderStatus.AFTER_SALES, label: 'After Sales', icon: <AlertTriangle size={16} /> },
    { id: OrderStatus.COMPLETED, label: 'Completed', icon: <CheckCircle size={16} /> },
  ];

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col font-sans relative">
      
      {/* Fixed Top Section (Header + Tabs) */}
      <div className="flex-none bg-white dark:bg-slate-900 z-30 shadow-sm border-b border-slate-200 dark:border-slate-800">
        {/* App Bar */}
        <header className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="relative group">
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 group-hover:border-primary-500 transition-colors">
                 <img src={profile.avatarUrl} alt="User" className="w-full h-full object-cover" />
               </div>
               <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${profile.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></div>
            </button>
            <div>
               <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">My Jobs</h1>
               <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
                onClick={() => setChatOpen(true)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 transition-colors relative"
            >
              <MessageSquare size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="w-full overflow-x-auto no-scrollbar px-4 pt-2">
          <div className="flex gap-4 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = MOCK_ORDERS.filter(o => o.status === tab.id).length;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 pt-2 relative group transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <span className="text-sm font-bold whitespace-nowrap">{tab.label}</span>
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-600'}`}>
                        {count}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full shadow-[0_-2px_6px_rgba(20,112,55,0.3)]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4 animate-in fade-in duration-500 pb-24">
         {/* List Header */}
         <div className="flex items-center justify-between shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {activeTab.replace('_', ' ')}
            </h2>
            <button className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {filteredOrders.length} Total
            </button>
         </div>

         {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                    <CheckCircle size={48} className="text-slate-300 dark:text-slate-600" />
                </div>
                <p className="text-lg font-medium">No orders in this category</p>
                <p className="text-sm mt-1">Check other tabs for updates</p>
            </div>
         ) : (
             filteredOrders.map(order => (
                 <WorkOrderCard 
                    key={order.id} 
                    order={order} 
                    onAction={handleAction} 
                 />
             ))
         )}
      </main>

      {/* Overlays (Absolute to contain within mobile view) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        profile={profile}
        toggleOnline={() => setProfile(p => ({...p, isOnline: !p.isOnline}))}
      />
      
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setChatOpen(false)} 
        activeOrders={activeOrdersForChat}
      />

      <CompleteJobModal 
        isOpen={isCompleteModalOpen} 
        onClose={() => setCompleteModalOpen(false)} 
        order={selectedOrder} 
      />
      
      <RepairGuideModal 
        isOpen={isGuideModalOpen} 
        onClose={() => setGuideModalOpen(false)} 
        order={selectedOrder} 
      />
      
      <NavigationModal
        isOpen={isNavModalOpen}
        onClose={() => setNavModalOpen(false)}
        order={selectedOrder}
      />
      
      <PartsSelectionModal
        isOpen={isPartsModalOpen}
        onClose={() => setPartsModalOpen(false)}
        order={selectedOrder}
      />

      {/* Mobile Floating Action Button */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-900/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-20">
        <Scan size={24} />
      </button>

    </div>
  );
};

export default App;