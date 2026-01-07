import React from 'react';
import { createPortal } from 'react-dom';
import type { ModalType, ModalConfigState } from './types';

interface ModalUIProps {
  open: boolean;
  config: ModalConfigState;
  onClose: () => void;
  onConfirm?: () => void;
}

// Định nghĩa kiểu cho config UI để tránh lỗi index signature
interface UIConfig {
  iconColor: string;
  bgIcon: string;
  btnColor: string;
  icon: React.ReactNode;
}

const MODAL_STYLES: Record<ModalType, UIConfig> = {
  success: {
    iconColor: 'text-green-600',
    bgIcon: 'bg-green-100',
    btnColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  error: {
    iconColor: 'text-red-600',
    bgIcon: 'bg-red-100',
    btnColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  confirm: {
    iconColor: 'text-yellow-600',
    bgIcon: 'bg-yellow-100',
    btnColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  info: {
    iconColor: 'text-blue-600',
    bgIcon: 'bg-blue-100',
    btnColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const ModalUI: React.FC<ModalUIProps> = ({ open, config, onClose, onConfirm }) => {
  if (!open) return null;

  const { type, title, message, confirmText, cancelText } = config;
  const style = MODAL_STYLES[type];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${style.bgIcon} ${style.iconColor} mb-4`}>
            {style.icon}
          </div>

          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>

          <div className="mt-6 flex w-full gap-3">
            {/* Logic hiển thị nút: 
                - Nếu là 'confirm': Luôn hiện nút Hủy
                - Nếu có 'cancelText': Hiện nút Hủy (cho các case khác nếu muốn)
            */}
            {(type === 'confirm' || cancelText) && (
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto flex-1"
                onClick={onClose}
              >
                {cancelText || 'Hủy bỏ'}
              </button>
            )}
            
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex-1 ${style.btnColor}`}
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
            >
              {confirmText || 'Đồng ý'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalUI;