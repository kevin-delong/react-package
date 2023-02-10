import { createContext, useContext } from 'react';
import { CloseButtonProps, toast, ToastOptions } from 'react-toastify';

import createGUID from '../../../utils/createGUID';

export enum ToastPosition {
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
}
export enum ToastType {
  Default = 'default',
  Success = 'success',
  Saved = 'saved',
  Error = 'error',
}

interface IToastProvider {
  children: JSX.Element;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider = (props: IToastProvider): JSX.Element => {
  const showToast = (iToast: IToast) => {
    const toastId = iToast.id ?? createGUID();

    const toastText = (
      <span className='notification-message'>
        {iToast.description}
      </span>
    );
    const UndoButton = ({ closeToast }: CloseButtonProps) => (
      <button className='toast-undo-button' onClick={(e) => {
        if (iToast.undoCallback) { iToast.undoCallback(toastId); }
        closeToast(e);
      }}>
        Undo
      </button>);

    const toastOptions: ToastOptions = {
      toastId: toastId,
    };
    if (iToast.undoCallback) {
      toastOptions.closeButton = UndoButton;
    }
    if (iToast.autoDeleteTime) {
      toastOptions.autoClose = iToast.autoDeleteTime;
    }
    if (iToast.className) {
      toastOptions.className = iToast.className;
    }
    toast(toastText, toastOptions);
  };

  const value = {
    showToast,
  };
  return <ToastContext.Provider value={value}> {props.children}</ToastContext.Provider>;
};

const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('ToastContext must be used inside of a ToastProvider');
  return context;
};

export {
  ToastProvider,
  useToast,
};
