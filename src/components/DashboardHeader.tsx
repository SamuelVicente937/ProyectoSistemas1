import {User2, type LucideIcon } from "lucide-react";

interface DashboardHeaderProps{
    userName: string;
    userEmail: string;
    userCode: string;
    icon?: LucideIcon;
}

const DashboardHeader = ({
    userName,
    userEmail,
    userCode,
    icon: IconComponent = User2,   
}: DashboardHeaderProps) =>{
    return(
      <div className="bg-gradient-to-r from-[#767676] to-[#a00000] rounded-2xl p-8 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Bienvenido{" "}
                  <span className="text-white font-black">
                    {userName}
                  </span>
                </h1>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium">{userEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium">
                      ID: {userCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl blur-2xl animate-pulse"></div>
                <div className="bg-transparent p-6 relative z-10">
                  <IconComponent className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>  
    );
}

export default DashboardHeader;