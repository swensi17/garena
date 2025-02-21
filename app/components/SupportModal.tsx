import React, { useState, useEffect } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    checkSubmissionLimit();
  }, []);

  const checkSubmissionLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('supportSubmissions') || '[]');
    const currentTime = new Date().getTime();
    
    // Фильтруем обращения за последние 24 часа
    const recentSubmissions = submissions.filter((submission: number) => {
      return (currentTime - submission) < 24 * 60 * 60 * 1000;
    });

    if (recentSubmissions.length >= 2) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const timeUntilReset = 24 * 60 * 60 * 1000 - (currentTime - oldestSubmission);
      setRemainingTime(Math.ceil(timeUntilReset / (60 * 60 * 1000)));
      setError('Достигнут лимит обращений (2 в сутки)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (remainingTime !== null) {
      return;
    }

    setIsSubmitting(true);

    // Сохраняем время отправки
    const currentTime = new Date().getTime();
    const submissions = JSON.parse(localStorage.getItem('supportSubmissions') || '[]');
    localStorage.setItem('supportSubmissions', JSON.stringify([...submissions, currentTime]));

    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      
      // Показываем уведомление о модерации
      const moderationNotification = document.createElement('div');
      moderationNotification.className = 'fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-slideIn';
      moderationNotification.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Обращение отправлено на модерацию</p>
            <p class="text-sm text-white/80">Среднее время ответа: 20 минут</p>
          </div>
        </div>
      `;
      document.body.appendChild(moderationNotification);

      setTimeout(() => {
        moderationNotification.remove();
      }, 5000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Затемнение фона */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Модальное окно */}
      <div className="relative w-full max-w-lg bg-[#1a1f2e] rounded-2xl shadow-2xl">
        {/* Декоративный градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"></div>

        <div className="relative p-6">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Обращение в поддержку</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error ? (
            <div className="bg-gradient-to-r from-red-500/5 to-orange-500/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-red-400">{error}</p>
                  {remainingTime && (
                    <p className="text-sm text-red-400/80 mt-2">
                      Следующее обращение будет доступно через {remainingTime} ч.
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">Лимит превышен</span>
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm">{remainingTime}ч ожидания</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Категория обращения
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option value="general">Общий вопрос</option>
                  <option value="payment">Проблема с оплатой</option>
                  <option value="technical">Техническая проблема</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email для связи
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите ваш email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишите вашу проблему..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить обращение'}
              </button>
            </form>
          )}

          {/* Информация о поддержке */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-white font-medium">Поддержка онлайн</p>
                <p className="text-sm text-gray-400">Среднее время ответа: 20 минут</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 