import React from 'react';
import { EngineerProfile } from '../types';
import { 
  X, 
  Wifi, 
  RotateCw, 
  ClipboardCheck, 
  Wallet, 
  Award, 
  Star, 
  AlertCircle,
  Settings,
  HelpCircle,
  LogOut,
  Building2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile: EngineerProfile;
  toggleOnline: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, profile, toggleOnline }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-slate-900 z-50 transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar p-6">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-primary-500 p-0.5">
                <img src={profile.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${profile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-slate-400 text-sm mt-1">Senior Field Technician</p>
          </div>

          {/* Online Status Toggle */}
          <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl mb-4 border border-slate-700">
            <div className="flex items-center gap-3 text-white">
              <Wifi size={20} className={profile.isOnline ? 'text-green-400' : 'text-gray-400'} />
              <span className="font-medium">Online Status</span>
            </div>
            <button 
              onClick={toggleOnline}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${profile.isOnline ? 'bg-primary-600' : 'bg-slate-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${profile.isOnline ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Company Info */}
          <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl mb-8 border border-slate-700 group cursor-pointer hover:border-primary-500/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase">Current Company</p>
                <p className="text-white font-bold">{profile.company}</p>
              </div>
            </div>
            <RotateCw size={18} className="text-primary-400 group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Daily Overview</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="bg-primary-500/20 w-8 h-8 rounded-lg flex items-center justify-center text-primary-400 mb-2">
                  <ClipboardCheck size={18} />
                </div>
                <p className="text-slate-400 text-xs">Today's Orders</p>
                <p className="text-white text-2xl font-bold mt-1">{profile.todayOrders}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="bg-green-500/20 w-8 h-8 rounded-lg flex items-center justify-center text-green-400 mb-2">
                  <Wallet size={18} />
                </div>
                <p className="text-slate-400 text-xs">Balance</p>
                <p className="text-white text-2xl font-bold mt-1">${profile.balance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Performance</p>
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex justify-between divide-x divide-slate-700">
              <div className="flex flex-col items-center flex-1">
                <span className="text-white font-bold text-lg">{profile.creditScore}</span>
                <span className="text-slate-500 text-[10px] mt-1">Credit Score</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-white font-bold text-lg flex items-center gap-1">
                  4.9 <Star size={12} className="fill-yellow-400 text-yellow-400" />
                </span>
                <span className="text-slate-500 text-[10px] mt-1">Satisfaction</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-white font-bold text-lg">{profile.complaintCount}</span>
                <span className="text-slate-500 text-[10px] mt-1">Complaints</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mb-8 transition-colors shadow-lg shadow-primary-900/20">
            <Award size={20} />
            Skill Certification
          </button>

          {/* Footer Links */}
          <div className="mt-auto border-t border-slate-800 pt-6 space-y-1">
             <button className="flex w-full items-center gap-4 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <Settings size={20} />
                <span>Settings</span>
             </button>
             <button className="flex w-full items-center gap-4 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <HelpCircle size={20} />
                <span>Help & Support</span>
             </button>
             <button className="flex w-full items-center gap-4 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
