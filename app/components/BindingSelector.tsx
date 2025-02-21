import React from 'react';
import Image from 'next/image';

interface BindingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BindingSelectorProps {
  onSelect: (option: string) => void;
  selectedOption: string;
}

export default function BindingSelector({ onSelect, selectedOption }: BindingSelectorProps) {
  const bindingOptions: BindingOption[] = [
    {
      id: 'facebook',
      title: 'Facebook',
      description: 'Привязка через аккаунт Facebook',
      icon: '👤'
    },
    {
      id: 'google',
      title: 'Google Play',
      description: 'Привязка через Google Play',
      icon: '🎮'
    },
    {
      id: 'vk',
      title: 'VK',
      description: 'Привязка через аккаунт VK',
      icon: '💬'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 glass-effect rounded-2xl p-3 floating">
            <div className="w-full h-full flex items-center justify-center text-3xl">
              🔐
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Выберите способ привязки
            </h2>
            <p className="text-gray-400">
              Укажите, через какой сервис привязан ваш аккаунт
            </p>
          </div>
      </div>

      <div className="grid gap-4">
        {bindingOptions.map((option) => (
          <button
            key={option.id}
              onClick={() => onSelect(option.id)}
              className={`relative w-full p-6 rounded-xl border transition-all duration-300 ${
                selectedOption === option.id
                  ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">{option.icon}</span>
              </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {option.description}
                  </p>
              </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedOption === option.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-white/30'
              }`}>
                  {selectedOption === option.id && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

              {/* Декоративный элемент */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
          </button>
        ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <p className="text-sm text-yellow-200/80">
              Выберите тот способ привязки, который вы использовали при создании аккаунта. 
              Это необходимо для корректного зачисления алмазов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 