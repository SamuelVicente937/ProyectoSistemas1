import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export default function Input({
  label,
  icon: Icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {label && (
        <label className="block text-xs text-[#767676] mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#a00000] w-5 h-5" />
        )}
        <input
          className={`w-full ${Icon ? 'pl-8' : 'pl-0'} pr-4 py-3 border-b-2 border-[#767676] focus:border-[#a00000] outline-none transition-colors bg-transparent text-[#767676] placeholder-gray-400 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
