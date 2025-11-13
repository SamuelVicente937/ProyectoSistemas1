import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "primary" | "secondary" | "warning";
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  variant = "primary",
}: StatCardProps) => {
     const variantStyles = {
    primary: 'border-[#a00000] bg-[#a00000]/10 shadow-lg',
    secondary: 'border-[#767676] bg-[#767676]/10 shadow-lg',
    warning: 'border-[#a00000] bg-[#a00000]/10 shadow-lg',
  };

  const iconColorStyles = {
    primary: 'text-[#a00000]',
    secondary: 'text-[#767676]',
    warning: 'text-[#a00000]',
  };

  return (
    <div
      className={`border-2 ${variantStyles[variant]} rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#a00000] to-[#767676] flex items-center justify-center flex-shrink-0 shadow-md">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-[#767676] uppercase tracking-wider font-bold">{title}</p>
          <p className={`text-4xl font-black ${iconColorStyles[variant]} mt-2`}>{value}</p>
          {subtitle && <p className="text-sm text-[#767676]/70 font-semibold mt-2">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;