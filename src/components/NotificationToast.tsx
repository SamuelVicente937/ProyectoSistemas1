import { AlertCircle, CheckCircle2, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface Notification {
  id: number;
  type: "new_report" | "status_change" | "comment";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationToast = ({
  notification,
  onClose,
}: NotificationToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "new_report":
        return <AlertCircle className="w-6 h-6 text-[#a00000] animate-pulse" />;
      case "status_change":
        return <Clock className="w-6 h-6 text-blue-600" />;
      case "comment":
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-[#a00000]" />;
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border-2 border-[#a00000] p-4 w-80 animate-bounce-in">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{getIcon()}</div>

          <div className="flex-1">
            <h4 className="font-bold text-[#767676] mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-[#767676]/80 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-[#767676]/60 mt-2">
              {new Date(notification.timestamp).toLocaleTimeString("es-BO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 text-[#767676] hover:text-[#a00000] transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

};


export default NotificationToast;