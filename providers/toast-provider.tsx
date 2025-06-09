'use client';

import toast, { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          width: 'w-auto',
          maxWidth: '100%',
          padding: '12px',
        },
      }}
    />
  );
};

export default ToastProvider;
