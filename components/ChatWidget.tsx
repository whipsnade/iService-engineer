import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip, Minimize2 } from 'lucide-react';
import { WorkOrder, ChatMessage } from '../types';
import { MOCK_ORDERS } from '../constants';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: WorkOrder[];
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, activeOrders }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi Alex, how can we help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOrderSelectorOpen, setIsOrderSelectorOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate support response
    setTimeout(() => {
        const response: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "Thanks for reporting. We'll look into it.",
            sender: 'support',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleAttachOrder = (orderId: string) => {
    const order = MOCK_ORDERS.find(o => o.id === orderId);
    if (!order) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Regarding Work Order #${order.id}: ${order.faultDescription}`,
      sender: 'user',
      timestamp: new Date(),
      attachedOrderId: orderId
    };
    setMessages([...messages, newMessage]);
    setIsOrderSelectorOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="bg-black/20 absolute inset-0 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="bg-white dark:bg-slate-900 w-full sm:w-[95%] h-[80%] sm:h-[600px] sm:rounded-2xl shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">CS</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Support Team</h3>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
              <Minimize2 size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-primary-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
              }`}>
                {msg.attachedOrderId && (
                    <div className="mb-2 p-2 bg-black/10 rounded text-xs border-l-2 border-white/50">
                        <span className="font-bold block">Attached Order</span>
                        ID: {msg.attachedOrderId}
                    </div>
                )}
                <p className="text-sm">{msg.text}</p>
                <span className="text-[10px] opacity-70 block text-right mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Order Selector Overlay */}
        {isOrderSelectorOpen && (
            <div className="absolute bottom-16 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-800 shadow-xl max-h-60 overflow-y-auto p-2 rounded-t-xl z-10">
                <div className="flex justify-between items-center px-2 py-2 border-b dark:border-slate-800 mb-2">
                    <span className="text-xs font-bold uppercase text-slate-500">Select Order to Attach</span>
                    <button onClick={() => setIsOrderSelectorOpen(false)}><X size={16} /></button>
                </div>
                {activeOrders.length === 0 ? (
                    <p className="text-center text-sm text-slate-500 py-4">No active orders found.</p>
                ) : (
                    activeOrders.map(order => (
                        <button 
                            key={order.id}
                            onClick={() => handleAttachOrder(order.id)}
                            className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-b dark:border-slate-800 last:border-0"
                        >
                            <div className="flex justify-between">
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{order.id}</span>
                                <span className="text-xs text-slate-500">{order.distance}</span>
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">{order.storeName}</div>
                        </button>
                    ))
                )}
            </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
            <button 
                onClick={() => setIsOrderSelectorOpen(!isOrderSelectorOpen)}
                className={`p-2 rounded-lg transition-colors ${isOrderSelectorOpen ? 'bg-primary-100 text-primary-600' : 'text-slate-400 hover:text-slate-600 hover:bg-white'}`}
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;