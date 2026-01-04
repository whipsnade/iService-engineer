import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Clock, Calendar, AlertTriangle, 
  Phone, Navigation, CheckSquare, Package, FileText,
  ChevronRight, MoreVertical, Star, User, Paperclip,
  Image as ImageIcon, Film, Play, X
} from 'lucide-react';
import { WorkOrder, OrderStatus, Attachment } from '../types';

interface WorkOrderDetailProps {
  order: WorkOrder;
  onBack: () => void;
  onAction: (action: string, order: WorkOrder) => void;
}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = ({ order, onBack, onAction }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'parts'>('overview');
  const [viewingAttachment, setViewingAttachment] = useState<Attachment | null>(null);

  const getStatusColor = (status: OrderStatus) => {
      switch (status) {
          case OrderStatus.PENDING: return 'bg-blue-100 text-blue-700 border-blue-200';
          case OrderStatus.TO_VISIT: return 'bg-purple-100 text-purple-700 border-purple-200';
          case OrderStatus.IN_PROGRESS: return 'bg-green-100 text-green-700 border-green-200';
          case OrderStatus.ON_HOLD: return 'bg-orange-100 text-orange-700 border-orange-200';
          case OrderStatus.AFTER_SALES: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
          case OrderStatus.COMPLETED: return 'bg-slate-100 text-slate-700 border-slate-200';
          default: return 'bg-slate-100 text-slate-700 border-slate-200';
      }
  };

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-40 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Navbar */}
      <div className="bg-white dark:bg-slate-900 px-4 py-3 flex items-center justify-between shadow-sm z-10 border-b border-slate-100 dark:border-slate-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={24} className="text-slate-800 dark:text-white" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Order Details</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 p-5 pb-0 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{order.storeName}</h2>
                    <p className="text-slate-500 text-sm font-mono">#{order.id}</p>
                </div>
                {/* Priority Icon */}
                <div className={`p-2 rounded-lg ${order.priority === 'Critical' ? 'bg-red-100' : 'bg-slate-100'} `}>
                    <AlertTriangle className={order.priority === 'Critical' ? 'text-red-500' : 'text-slate-500'} size={24} />
                </div>
            </div>

            {/* Address Row */}
            <button 
                onClick={() => onAction('navigate', order)}
                className="w-full text-left flex items-start gap-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors group"
            >
                <MapPin className="text-primary-600 mt-1 shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{order.address}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{order.distance} away</p>
                </div>
            </button>

            {/* Tabs Header */}
            <div className="flex gap-8">
                {['overview', 'tasks', 'parts'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 text-sm font-bold capitalize transition-colors relative ${
                            activeTab === tab 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 space-y-4">
            {activeTab === 'overview' && (
                <>
                    {/* Description */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Fault Description</h3>
                        <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
                            {order.faultDescription}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-400 mb-3">Customer Attachments</h4>
                            {order.attachments && order.attachments.length > 0 ? (
                                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                    {order.attachments.map((att) => (
                                        <button 
                                            key={att.id}
                                            onClick={() => setViewingAttachment(att)}
                                            className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                                        >
                                            <img 
                                                src={att.thumbnailUrl || att.url} 
                                                alt="Attachment" 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                            />
                                            {/* Type Indicator Overlay */}
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                {att.type === 'video' ? (
                                                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                                                        <Play size={14} className="ml-0.5 fill-white" />
                                                    </div>
                                                ) : (
                                                    // Only show icon on hover for images
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ImageIcon size={20} className="text-white drop-shadow-md" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                                    <ImageIcon size={18} />
                                    <span className="text-sm">No photos or videos provided</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                                 <User size={20} />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-slate-900 dark:text-white">Store Manager</p>
                                 <p className="text-xs text-slate-500">John Doe</p>
                             </div>
                         </div>
                         <a 
                            href={`tel:${order.storePhone}`}
                            className="p-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                         >
                             <Phone size={20} />
                         </a>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                            <Clock className="text-orange-500 mb-2" size={20} />
                            <p className="text-xs text-slate-500 uppercase font-bold">Scheduled</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Today, 2:00 PM</p>
                        </div>
                         <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                            <Package className="text-purple-500 mb-2" size={20} />
                            <p className="text-xs text-slate-500 uppercase font-bold">Equipment</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{order.type}</p>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'tasks' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Checklist</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">1/4 Done</span>
                     </div>
                     <div className="space-y-4">
                         {['Verify power source', 'Check error codes', 'Inspect physical damage', 'Test operation'].map((task, i) => (
                             <div key={i} className="flex items-start gap-3 group cursor-pointer">
                                 <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${i === 0 ? 'bg-primary-600 border-primary-600 text-white' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-500'}`}>
                                     {i === 0 && <CheckSquare size={12} />}
                                 </div>
                                 <span className={`text-sm ${i === 0 ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{task}</span>
                             </div>
                         ))}
                     </div>
                </div>
            )}

            {activeTab === 'parts' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Package size={32} />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">No parts ordered yet</p>
                    <p className="text-slate-400 text-xs mb-4">You can request parts from the warehouse</p>
                    <button onClick={() => onAction('parts', order)} className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-900/10">
                        Open Parts Catalog
                    </button>
                </div>
            )}

        </div>
      </div>
        
      {/* Bottom Action Button (Contextual) */}
      <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-800 pb-8 shrink-0">
           <button 
                onClick={() => {
                    // Quick Action logic based on status
                    if (order.status === 'PENDING') onAction('accept', order);
                    else if (order.status === 'TO_VISIT') onAction('confirm_arrival', order);
                    else if (order.status === 'IN_PROGRESS') onAction('complete', order);
                    else if (order.status === 'ON_HOLD') onAction('resume', order);
                    else onAction('support', order);
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
           >
                {order.status === 'PENDING' ? 'Accept Work Order' : 
                 order.status === 'TO_VISIT' ? 'Confirm Arrival' : 
                 order.status === 'IN_PROGRESS' ? 'Complete Job' : 
                 order.status === 'ON_HOLD' ? 'Resume Job' : 'Contact Support'}
           </button>
      </div>

      {/* Media Viewer Modal (Lightbox) */}
      {viewingAttachment && (
          <div className="absolute inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200">
              {/* Close Button */}
              <button 
                  onClick={() => setViewingAttachment(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                  <X size={24} />
              </button>

              {/* Content */}
              <div className="w-full h-full flex items-center justify-center p-2">
                  {viewingAttachment.type === 'video' ? (
                      <video 
                          src={viewingAttachment.url} 
                          controls 
                          autoPlay 
                          className="max-w-full max-h-full rounded-lg shadow-2xl"
                      />
                  ) : (
                      <img 
                          src={viewingAttachment.url} 
                          alt="Attachment" 
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      />
                  )}
              </div>
          </div>
      )}

    </div>
  );
}

export default WorkOrderDetail;