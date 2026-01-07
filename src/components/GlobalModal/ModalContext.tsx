import React, { createContext, useContext, useState, useCallback,type ReactNode } from 'react';
import ModalUI from './ModalUI';
import type { ModalContextType, ModalConfigState, ModalType, ModalOptions } from './types';

// Tạo Context với giá trị khởi tạo là undefined để bắt buộc dùng trong Provider
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  const [modalConfig, setModalConfig] = useState<ModalConfigState>({
    type: 'info',
    title: '',
    message: '',
  });

  const showModal = useCallback((
    type: ModalType, 
    title: string, 
    message: string, 
    onConfirm?: () => void, 
    options: ModalOptions = {}
  ) => {
    setModalConfig({
      type,
      title,
      message,
      onConfirm,
      confirmText: options.confirmText,
      cancelText: options.cancelText
    });
    setOpen(true);
  }, []);

  const hideModal = useCallback(() => setOpen(false), []);

  // Triển khai các hàm helper
  const success = useCallback((title: string, message: string) => {
    showModal('success', title, message);
  }, [showModal]);

  const error = useCallback((title: string, message: string) => {
    showModal('error', title, message);
  }, [showModal]);

  const info = useCallback((title: string, message: string) => {
    showModal('info', title, message);
  }, [showModal]);

  const confirm = useCallback((
    title: string, 
    message: string, 
    onOk: () => void, 
    options?: ModalOptions
  ) => {
    showModal('confirm', title, message, onOk, options);
  }, [showModal]);

  const value: ModalContextType = {
    success,
    error,
    info,
    confirm,
    hideModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalUI 
        open={open} 
        config={modalConfig} 
        onClose={hideModal} 
        onConfirm={modalConfig.onConfirm}
      />
    </ModalContext.Provider>
  );
};

// Hook tùy chỉnh có kiểm tra type safe
// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};