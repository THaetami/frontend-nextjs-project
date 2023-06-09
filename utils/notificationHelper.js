import { toast } from 'react-toastify';

export const notificationHelper = (message, storageKey) => {
    const data = sessionStorage.getItem(storageKey);
  
    if (data) {
      const toastId = toast.info(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
  
      setTimeout(() => {
        toast.dismiss(toastId);
        sessionStorage.removeItem(storageKey);
      }, 5000);
  
      return true; 
    }
  
    return false;
  };