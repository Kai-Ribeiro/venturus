import React, { useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = React.createContext(null);
let toastId = 0;

export { ToastContext };

export default ({ children }) => {
  const [ toasts, setToasts ] = useState([]);

  const addToast = useCallback((options) => {
    setToasts((toasts) => [
      ...toasts,
      {
        id: (toastId++).toString(),
        ...options
      }
    ]);
  }, [ setToasts ]);

  const removeToast = useCallback((id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, [ setToasts ]);

  const renderToast = (toast) => {
    return (
      <Toast
        key={ toast.id }
        id={ toast.id }
        color={ toast.color }
        header={ toast.header }
        body={ toast.body } />
    );
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      { children }
      <div className="toast-container">
        { toasts.map(renderToast) }
      </div>
    </ToastContext.Provider>
  );
}
