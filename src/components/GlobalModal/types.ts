export type ModalType = 'success' | 'error' | 'confirm' | 'info';

export interface ModalOptions {
  confirmText?: string;
  cancelText?: string;
}

export interface ModalConfigState {
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export interface ModalContextType {
  success: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
  confirm: (
    title: string, 
    message: string, 
    onOk: () => void, 
    options?: ModalOptions
  ) => void;
  hideModal: () => void;
}