import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import createGUID from '../../../utils/createGUID';
export var ToastPosition;
(function (ToastPosition) {
    ToastPosition["TopRight"] = "top-right";
    ToastPosition["TopLeft"] = "top-left";
    ToastPosition["BottomRight"] = "bottom-right";
    ToastPosition["BottomLeft"] = "bottom-left";
})(ToastPosition || (ToastPosition = {}));
export var ToastType;
(function (ToastType) {
    ToastType["Default"] = "default";
    ToastType["Success"] = "success";
    ToastType["Saved"] = "saved";
    ToastType["Error"] = "error";
})(ToastType || (ToastType = {}));
const ToastContext = createContext({});
const ToastProvider = (props) => {
    const showToast = (iToast) => {
        const toastId = iToast.id ?? createGUID();
        const toastText = (<span className='notification-message'>
        {iToast.description}
      </span>);
        const UndoButton = ({ closeToast }) => (<button className='toast-undo-button' onClick={(e) => {
                if (iToast.undoCallback) {
                    iToast.undoCallback(toastId);
                }
                closeToast(e);
            }}>
        Undo
      </button>);
        const toastOptions = {
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
const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('ToastContext must be used inside of a ToastProvider');
    return context;
};
export { ToastProvider, useToast, };
