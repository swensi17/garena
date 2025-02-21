import React, { useEffect } from 'react';

interface SubmissionNotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function SubmissionNotification({ type, message, onClose }: SubmissionNotificationProps) {
  useEffect(() => {
    if (type === 'success') {
    const timer = setTimeout(() => {
      onClose();
      }, 3000);
    return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const isPromoNotification = message.includes('Промокод');
  const isSubmissionNotification = message.includes('Спасибо за покупку');

  return (
    <div className="fixed top-4 right-4 left-4 md:right-8 md:left-auto z-50">
      <div className={`bg-gradient-to-r ${
        type === 'success' 
          ? isPromoNotification 
            ? 'from-yellow-600 to-orange-600'
            : 'from-green-600 to-blue-600'
          : 'from-red-600 to-orange-600'
      } rounded-xl shadow-xl max-w-sm mx-auto md:mx-0 overflow-hidden animate-slideDown`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          {type === 'success' ? (
              <svg 
                className="w-5 h-5 text-white animate-checkmark" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                  d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
              <span className="text-xl">⚠️</span>
          )}
        </div>
          <div>
            <p className="text-white font-medium">{message}</p>
          {isSubmissionNotification && (
            <p className="text-sm text-white/80 mt-1">
              Время доставки: ~20 минут
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
} 