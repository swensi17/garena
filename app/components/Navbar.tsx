import React, { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-4">
          {/* Логотип */}
          <div className="flex items-center gap-2">
            <div className="relative w-16 h-16">
              <Image
                src="https://i.postimg.cc/G8LZQtb2/minimalist-heroic-free-fire-gls3ucwhj41aszq9-fotor-bg-remover-20250221235242.png"
                alt="Free Fire Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                unoptimized
                priority
              />
            </div>
            </div>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors py-2"
                onClick={() => toggleDropdown('help')}
              >
                Помощь
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 transition-all duration-200 ${activeDropdown === 'help' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="py-2">
                  <a href="#faq" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Частые вопросы
                  </a>
                  <a href="#support" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Поддержка
                  </a>
                  <a href="#rules" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Правила
                  </a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors py-2"
                onClick={() => toggleDropdown('info')}
              >
                Информация
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 transition-all duration-200 ${activeDropdown === 'info' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="py-2">
                  <a href="#about" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    О сервисе
                  </a>
                  <a href="#guarantees" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Гарантии
                  </a>
                  <a href="#reviews" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Отзывы
                  </a>
                </div>
              </div>
            </div>

            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Контакты
            </a>

            <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              Поддержка 24/7
            </button>
          </div>

          {/* Мобильная кнопка меню */}
          <button 
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-4 py-2 border-t border-white/10">
            <div className="space-y-1">
              <button 
                className="flex items-center justify-between w-full py-2 text-white/80"
                onClick={() => toggleDropdown('mobile-help')}
              >
                Помощь
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-help' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`pl-4 space-y-1 transition-all duration-200 ${activeDropdown === 'mobile-help' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <a href="#faq" className="block py-2 text-sm text-white/60 hover:text-white">Частые вопросы</a>
                <a href="#support" className="block py-2 text-sm text-white/60 hover:text-white">Поддержка</a>
                <a href="#rules" className="block py-2 text-sm text-white/60 hover:text-white">Правила</a>
              </div>

              <button 
                className="flex items-center justify-between w-full py-2 text-white/80"
                onClick={() => toggleDropdown('mobile-info')}
              >
                Информация
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-info' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`pl-4 space-y-1 transition-all duration-200 ${activeDropdown === 'mobile-info' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <a href="#about" className="block py-2 text-sm text-white/60 hover:text-white">О сервисе</a>
                <a href="#guarantees" className="block py-2 text-sm text-white/60 hover:text-white">Гарантии</a>
                <a href="#reviews" className="block py-2 text-sm text-white/60 hover:text-white">Отзывы</a>
              </div>

              <a href="#contact" className="block py-2 text-white/80 hover:text-white">
                Контакты
              </a>

              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                Поддержка 24/7
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 