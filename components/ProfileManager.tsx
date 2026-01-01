
import React from 'react';
import { User, Briefcase, Baby, Ghost, Shield, Fingerprint, Plus, Check, LogOut, Settings } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileManagerProps {
  profiles: UserProfile[];
  onSwitchProfile: (id: string) => void;
  onAddProfile: () => void;
  onToggleBiometric: (id: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ profiles, onSwitchProfile, onAddProfile, onToggleBiometric }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <h2 className="text-xl font-bold clash text-white mb-1">Identity Hub</h2>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Manage Personas & Access</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        {/* Active Profiles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest">Available Profiles</h3>
            <button onClick={onAddProfile} className="p-2 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {profiles.map(profile => (
              <div 
                key={profile.id}
                onClick={() => onSwitchProfile(profile.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                  profile.isActive 
                    ? 'bg-[#D4AF37]/5 border-[#D4AF37]/40' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                {profile.isActive && (
                  <div className="absolute top-0 right-0 p-3 text-[#D4AF37]">
                    <Check size={16} />
                  </div>
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border ${
                    profile.isActive ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/10 text-white/40'
                  }`} style={{ backgroundColor: profile.themeColor + '20' }}>
                    {profile.type === 'work' && <Briefcase size={20} />}
                    {profile.type === 'personal' && <User size={20} />}
                    {profile.type === 'child' && <Baby size={20} />}
                    {profile.type === 'guest' && <Ghost size={20} />}
                  </div>
                  
                  <div>
                    <h4 className={`text-sm font-bold ${profile.isActive ? 'text-white' : 'text-white/60'}`}>{profile.name}</h4>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{profile.type} Workspace</p>
                  </div>
                </div>

                {profile.isActive && (
                  <div className="mt-4 pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profile.biometricEnabled ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {profile.biometricEnabled ? 'Biometric Locked' : 'Password Only'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleBiometric(profile.id); }}
                      className={`p-2 rounded-lg transition-all ${profile.biometricEnabled ? 'text-emerald-500 bg-emerald-500/10' : 'text-white/20 bg-white/5 hover:text-white'}`}
                      title="Toggle Biometric Auth"
                    >
                      <Fingerprint size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guest & Child Modes */}
        <section className="grid grid-cols-2 gap-4">
          <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Ghost size={20} />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Guest Mode</h4>
            <p className="text-[9px] text-white/40 leading-relaxed">Ephemeral session. No data persisted.</p>
          </button>

          <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Baby size={20} />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Kids Mode</h4>
            <p className="text-[9px] text-white/40 leading-relaxed">Content filters & time limits active.</p>
          </button>
        </section>

        {/* Enterprise Managed */}
        <div className="mt-auto p-4 rounded-2xl bg-blue-900/10 border border-blue-500/20 flex items-start gap-3">
          <Shield size={16} className="text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-blue-100 mb-1">Managed Organization</h4>
            <p className="text-[10px] text-blue-300/60 leading-relaxed">
              Some profile settings may be enforced by your organization's security policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
