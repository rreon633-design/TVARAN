
import React from 'react';
import { Camera, Mic, MapPin, Bell, Clipboard, X, Check, Ban } from 'lucide-react';
import { PermissionType } from '../types';

interface PermissionPromptProps {
  isOpen: boolean;
  origin: string;
  permission: PermissionType;
  onAllow: () => void;
  onBlock: () => void;
  onClose: () => void;
}

const PermissionPrompt: React.FC<PermissionPromptProps> = ({ isOpen, origin, permission, onAllow, onBlock, onClose }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (permission) {
      case 'camera': return <Camera size={20} />;
      case 'microphone': return <Mic size={20} />;
      case 'location': return <MapPin size={20} />;
      case 'notifications': return <Bell size={20} />;
      case 'clipboard': return <Clipboard size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getTitle = () => {
    switch (permission) {
      case 'camera': return 'Use your camera?';
      case 'microphone': return 'Use your microphone?';
      case 'location': return 'Know your location?';
      case 'notifications': return 'Show notifications?';
      case 'clipboard': return 'See text and images copied to the clipboard?';
      default: return 'Requesting permission';
    }
  };

  return (
    <div className="absolute top-28 left-8 z-[100] animate-in slide-in-from-top-2 duration-300">
      <div className="w-80 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="p-4 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-white text-sm font-bold mb-0.5">{origin}</h3>
            <p className="text-white/60 text-xs">{getTitle()}</p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white h-fit">
            <X size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/5">
          <button 
            onClick={onBlock}
            className="py-3 px-4 hover:bg-white/5 text-white/60 hover:text-red-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Ban size={14} /> Block
          </button>
          <button 
            onClick={onAllow}
            className="py-3 px-4 hover:bg-white/5 text-[#D4AF37] hover:text-[#FFD700] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Check size={14} /> Allow
          </button>
        </div>
      </div>
      {/* Triangle pointer */}
      <div className="absolute -top-2 left-6 w-4 h-4 bg-[#1A1A1A] border-t border-l border-white/10 transform rotate-45" />
    </div>
  );
};

export default PermissionPrompt;
