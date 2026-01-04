import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Video, AlertOctagon, Camera, Film } from 'lucide-react';
import { WorkOrder } from '../types';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const ModalBase: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Complete Job Modal
export const CompleteJobModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null }> = ({ isOpen, onClose, order }) => {
    const [notes, setNotes] = useState('');
    const [solution, setSolution] = useState('');

    const solutionOptions = [
        "Part Replaced",
        "Firmware Update",
        "Hardware Reset",
        "Cleaning/Maint.",
        "Configuration",
        "Other"
    ];

    // Reset state when the order ID changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setNotes('');
            setSolution('');
        }
    }, [isOpen, order?.id]);

    const handleSubmit = () => {
        console.log(`Submitting completion for Order #${order?.id}. Solution: ${solution}. Notes: ${notes}`);
        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Complete Job">
            <div className="space-y-5">
                {/* Header Info */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between items-center border border-slate-100 dark:border-slate-700">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Job ID</p>
                        <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{order?.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Store</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[150px] truncate">{order?.storeName}</p>
                    </div>
                </div>

                {/* Solution Selector */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Select Solution <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {solutionOptions.map(opt => (
                            <button
                                key={opt}
                                onClick={() => setSolution(opt)}
                                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all duration-200 ${
                                    solution === opt
                                        ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-[1.02]'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor={`notes-${order?.id}`} className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Remarks / Notes
                    </label>
                    <textarea 
                        id={`notes-${order?.id}`}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[100px] text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 p-3 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none transition-shadow" 
                        placeholder="Describe the repair details..."
                    ></textarea>
                </div>

                {/* Media Upload */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Attachments
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary-400 transition-all cursor-pointer group">
                        <div className="flex gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Camera size={24} className="text-blue-500" />
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 delay-75">
                                <Film size={24} className="text-purple-500" />
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors">
                            Upload Photos or Video
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                            Tap to browse gallery or camera
                        </span>
                    </div>
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={!solution}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-2 transition-all shadow-lg shadow-primary-900/20 active:scale-[0.98]"
                >
                    <CheckCircle size={20} />
                    Submit Completion
                </button>
            </div>
        </ModalBase>
    );
};

// Repair Guide Modal
export const RepairGuideModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null }> = ({ isOpen, onClose, order }) => {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Repair Guide">
            <div className="space-y-4">
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <img src="https://picsum.photos/seed/video/600/400" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                             <Video size={32} className="text-white fill-white" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{order?.type} Standard Procedure</h4>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <ul className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>Isolate power supply before opening panel.</li>
                            <li>Check error codes on main board.</li>
                            <li>Reset sensor array if applicable.</li>
                            <li>Verify voltage levels on rails A and B.</li>
                            <li>Clean all contacts before reassembly.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};