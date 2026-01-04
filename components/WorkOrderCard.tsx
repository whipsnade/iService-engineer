import React from 'react';
import { WorkOrder, OrderStatus } from '../types';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Phone,
  PauseCircle,
  PlayCircle,
  CheckCircle,
  Wrench,
  BookOpen,
  Package,
  UserPlus
} from 'lucide-react';

interface WorkOrderCardProps {
  order: WorkOrder;
  onAction: (action: string, order: WorkOrder) => void;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ order, onAction }) => {
  
  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    onAction(action, order);
  };

  const handleCallStore = (e: React.MouseEvent) => {
      e.stopPropagation();
      window.location.href = `tel:${order.storePhone}`;
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const renderStatusBadge = () => {
    const styles = getPriorityColor(order.priority);
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles}`}>
        {order.priority} Priority
      </span>
    );
  };

  const renderActions = () => {
    switch (order.status) {
      case OrderStatus.PENDING:
        return (
          <button 
            onClick={(e) => handleActionClick(e, 'accept')}
            className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
          >
            <span>Accept Job</span>
            <ChevronRight size={18} />
          </button>
        );

      case OrderStatus.TO_VISIT:
        return (
          <div className="mt-4 flex gap-3">
             <button 
                onClick={(e) => handleActionClick(e, 'parts')}
                className="shrink-0 w-20 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform border border-orange-100"
             >
                <Package size={20} />
                <span className="text-[10px] font-bold">Parts</span>
            </button>
            <button 
              onClick={(e) => handleActionClick(e, 'confirm_arrival')}
              className="flex-1 bg-white border-2 border-primary-600 text-primary-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-50 active:scale-[0.98] transition-all"
            >
              <MapPin size={18} />
              <span>Confirm Arrival</span>
            </button>
          </div>
        );

      case OrderStatus.IN_PROGRESS:
        return (
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button onClick={(e) => handleActionClick(e, 'pause')} className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <PauseCircle size={20} />
              <span className="text-[10px] font-bold">Pause</span>
            </button>
            <button onClick={(e) => handleActionClick(e, 'guide')} className="col-span-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <BookOpen size={20} />
              <span className="text-[10px] font-bold">Guide</span>
            </button>
             <button onClick={(e) => handleActionClick(e, 'parts')} className="col-span-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <Package size={20} />
              <span className="text-[10px] font-bold">Parts</span>
            </button>
            <button onClick={(e) => handleActionClick(e, 'complete')} className="col-span-1 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center py-2 gap-1 shadow-md active:scale-95 transition-transform">
              <CheckCircle size={20} />
              <span className="text-[10px] font-bold">Done</span>
            </button>
          </div>
        );

      case OrderStatus.ON_HOLD:
        return (
          <button 
            onClick={(e) => handleActionClick(e, 'resume')}
            className="w-full mt-4 bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700 active:scale-[0.98] transition-all"
          >
            <PlayCircle size={18} />
            <span>Resume Work</span>
          </button>
        );

      case OrderStatus.AFTER_SALES:
        return (
           <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-500 uppercase">Status</span>
                 <span className="text-sm font-semibold text-primary-700">{order.afterSalesStatus || 'Processing'}</span>
              </div>
              <button 
                onClick={(e) => handleActionClick(e, 'support')}
                className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 text-sm"
              >
                <Phone size={16} />
                <span>Contact Support</span>
              </button>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <article 
        onClick={() => onAction('view', order)}
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-all hover:shadow-md cursor-pointer active:bg-slate-50"
    >
       
       {/* Top Right Actions (Call & Reassign) */}
       <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
           <button 
                onClick={handleCallStore}
                className="p-2 bg-slate-100 hover:bg-green-50 text-slate-500 hover:text-green-600 rounded-full transition-colors border border-transparent hover:border-green-200"
                title="Call Store Manager"
           >
               <Phone size={18} />
           </button>
           
           {order.status === OrderStatus.IN_PROGRESS && (
             <button 
                onClick={(e) => handleActionClick(e, 'reassign')}
                className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                title="Reassign"
             >
                <UserPlus size={20} />
             </button>
           )}
       </div>

       {/* Header */}
       <div className="flex justify-between items-start pr-16">
         <div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight truncate max-w-[200px]">{order.storeName}</h3>
                {renderStatusBadge()}
            </div>
            <p className="text-xs text-slate-500 font-medium">#{order.id} • {order.type}</p>
         </div>
       </div>

       {/* Content */}
       <div className="mt-4 flex gap-4">
          <div className="flex-1 space-y-3">
             <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">
                    {order.faultDescription}
                </p>
             </div>
             
             <button 
                onClick={(e) => handleActionClick(e, 'navigate')}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm hover:text-primary-600 transition-colors text-left group w-full"
             >
                <MapPin size={16} className="shrink-0 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="truncate underline decoration-slate-300 underline-offset-2 group-hover:decoration-primary-600">{order.address}</span>
             </button>

             <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                    <Navigation size={12} />
                    <span>{order.distance}</span>
                </div>
                {order.startTime && (
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                        <Clock size={12} />
                        <span>Started: {order.startTime}</span>
                    </div>
                )}
             </div>
          </div>
       </div>

       {renderActions()}

    </article>
  );
};

export default WorkOrderCard;