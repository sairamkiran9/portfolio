import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ProfileCard = () => {
  return (
    // Main Card Container
    <div className="w-full max-w-sm bg-[var(--color-surface)] rounded-[2rem] p-6 shadow-2xl border border-[var(--color-card-border)]">

      {/* --- Top Section: Avatar & Name --- */}
      <div className="flex flex-col items-center">
        {/* Avatar Wrapper */}
        <div className="w-28 h-28 bg-[var(--color-secondary)] rounded-3xl mb-4 overflow-hidden shadow-inner flex items-center justify-center border-2 border-[var(--color-primary)]">
          {/* Placeholder for Image - Replace src with actual image */}
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-primary)] tracking-wide">
          Kiran Muppana
        </h2>

        {/* Role Badge */}
        <div className="bg-[var(--color-secondary)] px-6 py-2 rounded-xl mb-6 border border-[var(--color-card-border)]">
          <span className="text-[var(--color-text-secondary)] text-sm font-medium">Software Engineer</span>
        </div>
      </div>

      {/* --- Divider Line --- */}
      <div className="w-full h-px bg-[var(--color-card-border)] mb-6"></div>

      {/* --- Bottom Section: Contact Info --- */}
      <div className="space-y-4">
        
        {/* Email Item */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-card-border)]">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Email</p>
            <p className="text-sm font-medium text-[var(--color-text)]">kiranmuppana36@gmail.com</p>
          </div>
        </div>

        {/* Location Item */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-card-border)]">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Location</p>
            <p className="text-sm font-medium text-[var(--color-text)]">Tallahassee, FL</p>
          </div>
        </div>

        {/* Phone Item (Added to match your data) */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-card-border)]">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Phone</p>
            <p className="text-sm font-medium text-[var(--color-text)]">(850) 943-4453</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;