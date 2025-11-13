import { X } from "lucide-react";
import type { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
}: ModalProps) =>{
    if (!isOpen) return null;
    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105 border-2 border-[#767676]">
        <div className="flex items-center justify-between p-8 border-b-2 border-[#767676]">
          <h2 className="text-3xl font-black text-[#a00000]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#767676] hover:text-[#a00000] transition-colors hover:scale-110 duration-300"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="p-8">
          <p className="text-[#767676] text-lg font-semibold mb-6">{message}</p>
          {children}
        </div>

        <div className="flex gap-4 p-8 border-t-2 border-[#767676]">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-[#767676] text-[#767676] rounded-xl font-bold hover:bg-[#767676] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {cancelText}
          </button>
          <Button
            variant="primary"
            className="flex-1 py-3 font-bold"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;