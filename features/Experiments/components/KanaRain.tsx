'use client';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { allKana } from '../data/kanaData';

interface RainDrop {
  id: number;
  column: number;
  kana: string;
  romanji: string;
  speed: number;
  opacity: number;
}

const COLUMNS = 20;

const KanaRain = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [drops, setDrops] = useState<RainDrop[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Create initial drops
    const initial: RainDrop[] = [];
    for (let i = 0; i < 40; i++) {
      const kana = allKana[Math.floor(Math.random() * allKana.length)];
      initial.push({
        id: idCounter.current++,
        column: Math.floor(Math.random() * COLUMNS),
        kana: kana.kana,
        romanji: kana.romanji,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setDrops(initial);

    // Add new drops
    const interval = setInterval(() => {
      const kana = allKana[Math.floor(Math.random() * allKana.length)];
      setDrops(prev => {
        const newDrop: RainDrop = {
          id: idCounter.current++,
          column: Math.floor(Math.random() * COLUMNS),
          kana: kana.kana,
          romanji: kana.romanji,
          speed: Math.random() * 3 + 2,
          opacity: Math.random() * 0.5 + 0.3
        };
        const updated = [...prev, newDrop];
        if (updated.length > 60) {
          return updated.slice(-60);
        }
        return updated;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className='relative flex-1 min-h-[80vh] overflow-hidden'>
      {/* Rain drops */}
      {drops.map(drop => (
        <div
          key={drop.id}
          className='absolute text-2xl md:text-3xl cursor-default select-none'
          style={{
            left: `${(drop.column / COLUMNS) * 100 + 2.5}%`,
            opacity: hoveredId === drop.id ? 1 : drop.opacity,
            animation: `rain-fall ${drop.speed}s linear infinite`,
            animationDelay: `${Math.random() * -drop.speed}s`
          }}
          onMouseEnter={() => setHoveredId(drop.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <span
            lang='ja'
            className={clsx(
              'text-[var(--main-color)] transition-all duration-200',
              hoveredId === drop.id && 'text-green-400 scale-150'
            )}
          >
            {drop.kana}
          </span>
          {hoveredId === drop.id && (
            <span className='absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-green-400 whitespace-nowrap font-mono'>
              {drop.romanji}
            </span>
          )}
        </div>
      ))}

      {/* CSS animation */}
      <style jsx>{`
        @keyframes rain-fall {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }
      `}</style>
    </div>
  );
};

export default KanaRain;
