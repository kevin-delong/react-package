interface IToastContext {
  showToast: (toast: IToast) => void;
}

interface IToast {
  id?: string;
  description: string;
  onHideCallback?: (id: string) => void;
  onClose?: () => void;
  type?: string;
  title?: string;
  autoDelete?: boolean;
  undoCallback?: (id: string) => void;
  autoDeleteTime?: number;
  toastType?: EnumType;
  className?: string;
}

type EnumType = { [s: string]: string }
