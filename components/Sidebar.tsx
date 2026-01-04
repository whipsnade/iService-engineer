import React from 'react';
import { EngineerProfile, CertificationLevel } from '../types';
import { 
  X, 
  Wifi, 
  RotateCw, 
  ClipboardCheck, 
  Wallet, 
  Star, 
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  Plus,
  Medal,
  Crown,
  Shield,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile: EngineerProfile;
  toggleOnline: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, profile, toggleOnline }) => {
  
  const getBrandInitials = (name: string) => {
      if (name === 'Burger King') return 'BK';
      if (name === 'Starbucks') return 'SB';
      return name.substring(0, 3).toUpperCase();
  };

  const BadgeItem = ({ name, level }: { name: string, level: CertificationLevel }) => {
    // Styling Logic based on Level
    const getStyles = () => {
      switch (level) {
        case 'S':
          return {
            container: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
            text: "text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500",
            iconColor: "text-yellow-400",
            levelBadge: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg",
            pattern: (
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent animate-pulse"></div>
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              </div>
            )
          };
        case 'A':
          return {
            container: "bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]",
            text: "text-yellow-100",
            iconColor: "text-yellow-200",
            levelBadge: "bg-yellow-500 text-yellow-950",
            pattern: (
              <div className="absolute inset-0 opacity-20">
                 <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
              </div>
            )
          };
        case 'B':
          return {
            container: "bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-500",
            text: "text-slate-200",
            iconColor: "text-slate-300",
            levelBadge: "bg-slate-500 text-white",
            pattern: (
              <div className="absolute inset-0 opacity-10">
                 <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)', backgroundSize: '14px 14px' }}></div>
              </div>
            )
          };
        default: // C
          return {
            container: "bg-slate-800 border border-slate-700",
            text: "text-slate-400",
            iconColor: "text-slate-600",
            levelBadge: "bg-slate-700 text-slate-300",
            pattern: null
          };
      }
    };

    const styles = getStyles();

    return (
        <div className="flex flex-col items-center gap-2 w-[72px] group relative">
            {/* Main Badge Box */}
            <div className={`w-16 h-16 rounded-xl relative flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 ${styles.container}`}>
                
                {/* Background Pattern */}
                {styles.pattern}

                {/* Level Icon / Decor */}
                {level === 'S' && <Crown size={12} className={`absolute top-1 right-1 ${styles.iconColor}`} />}
                {level === 'A' && <Star size={12} className={`absolute top-1 right-1 ${styles.iconColor}`} />}
                {level === 'B' && <Shield size={12} className={`absolute top-1 right-1 ${styles.iconColor}`} />}

                {/* Brand Initials */}
                <span className={`font-black text-lg z-10 tracking-wider ${styles.text}`}>
                    {getBrandInitials(name)}
                </span>

                {/* Level Tag (Bottom Center) */}
                <div className={`absolute bottom-0 inset-x-0 h-4 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest z-10 ${styles.levelBadge}`}>
                    LV.{level}
                </div>
            </div>
            
            {/* Label below */}
            <span className="text-[10px] font-medium text-slate-400 text-center leading-tight truncate w-full group-hover:text-white transition-colors">
                {name}
            </span>
        </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-slate-900 z-50 transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

          {/* Skill Honor Wall */}
          <div className="mb-8">
             <div className="flex items-center justify-between mb-3 ml-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Skill Honor Wall</p>
                <Medal size={14} className="text-yellow-500" />
             </div>
             
             <div className="flex flex-wrap gap-3">
                {profile.certifications?.map((cert, index) => (
                    <BadgeItem key={index} name={cert.name} level={cert.level} />
                ))}
                
                {/* Add New Badge */}
                <button className="flex flex-col items-center gap-2 w-[72px] group">
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-700 hover:border-primary-500 hover:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary-500 transition-all">
                        <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 group-hover:text-primary-500 transition-colors">Apply New</span>
                </button>
             </div>
          </div>

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