import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DiamondPackageProps {
  id: number;
  name: string;
  diamonds: number;
  bonus: number;
  price: number;
  oldPrice?: number;
  image: string;
}

const getGradientByPackage = (id: number) => {
  const gradients = {
    1: 'from-[#1a237e] to-[#283593]', // Темно-синий
    2: 'from-[#4a148c] to-[#6a1b9a]', // Фиолетовый
    3: 'from-[#880e4f] to-[#ad1457]', // Розовый
    4: 'from-[#242875] to-[#1a237e]', // Индиго
    5: 'from-[#006064] to-[#00838f]', // Бирюзовый
    6: 'from-[#4a148c] to-[#311b92]', // Темно-фиолетовый
  };
  return gradients[id as keyof typeof gradients] || gradients[1];
};

const getButtonGradient = (id: number) => {
  const gradients = {
    1: 'from-[#5c6bc0] to-[#3f51b5]',
    2: 'from-[#7e57c2] to-[#5e35b1]',
    3: 'from-[#ec407a] to-[#d81b60]',
    4: 'from-[#5c6bc0] to-[#3f51b5]',
    5: 'from-[#26c6da] to-[#00acc1]',
    6: 'from-[#7e57c2] to-[#5e35b1]',
  };
  return gradients[id as keyof typeof gradients] || gradients[1];
};

const getDiamondColorByPackage = (id: number) => {
  const colors = {
    1: 'text-blue-400',
    2: 'text-purple-400',
    3: 'text-pink-400',
    4: 'text-indigo-400',
    5: 'text-cyan-400',
    6: 'text-violet-400',
  };
  return colors[id as keyof typeof colors] || colors[1];
};

export default function DiamondCard({
  id,
  name,
  diamonds,
  bonus,
  price,
  oldPrice,
  image
}: DiamondPackageProps) {
  const router = useRouter();

  const handleBuy = () => {
    router.push(`/purchase?package=${encodeURIComponent(name)}&diamonds=${diamonds}&price=${price}`);
  };

  return (
    <div className="relative group">
      <div 
        className="relative bg-[#1a1f2e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20"
        style={{
          background: 'linear-gradient(180deg, rgba(26,31,46,0.9) 0%, rgba(40,45,60,0.95) 100%)'
        }}
      >
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.postimg.cc/18gvwGP3/image.jpg"
            alt="Diamond background"
            layout="fill"
            objectFit="cover"
            className="opacity-50 group-hover:opacity-60 transition-opacity duration-300"
            priority
          />
        </div>

        <div className="relative z-10 p-4">
          {/* Верхняя часть с алмазами */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-xl">💎</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">{diamonds}</span>
                <span className="text-xs text-blue-400">Алмазов</span>
              </div>
            </div>
            {bonus > 0 && (
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/20">
                <span className="text-yellow-400 text-sm font-medium">+{bonus}</span>
              </div>
            )}
          </div>

          {/* Цена */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              {price} ₽
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {oldPrice} ₽
              </span>
            )}
          </div>

          {/* Кнопка покупки */}
          <button
            onClick={handleBuy}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 relative overflow-hidden group"
          >
            <span className="relative z-10">Купить</span>
            <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors duration-300"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-colors duration-300"></div>
      </div>
    </div>
  );
} 