'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import type * as THREE from 'three';

import { datesService } from '@/services/dates.service';
import { ImportantDate } from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.constants';
import {
  getGreetingPartsByHour,
  RANDOM_MARGIN_NOTES,
} from '@/components/modules/kitty/widgets/KittyHeroGreeting/kittyHeroGreeting.constants';
import {
  DEFAULT_START_DATE,
} from '@/components/modules/kitty/widgets/KittyTogetherTimer/togetherTimer.utils';
import styles from './KittyMemoryConstellation.module.css';

/* ────────────────────────────────────
   Star — одна зірка в 3D-просторі
   ──────────────────────────────────── */
interface StarProps {
  position: [number, number, number];
  label: string;
  colorHex: string;
  baseScale: number;
  phaseOffset: number;
  onTap: (label: string, screenPos: { x: number; y: number }) => void;
}

const Star: React.FC<StarProps> = ({ position, label, colorHex, baseScale, phaseOffset, onTap }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const pulse = 1 + 0.15 * Math.sin(t * 1.8 + phaseOffset);
      meshRef.current.scale.setScalar(baseScale * pulse);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const { clientX, clientY } = e.nativeEvent;
    onTap(label, { x: clientX, y: clientY });
  };

  return (
    <mesh ref={meshRef} position={position} onClick={handleClick}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={colorHex}
        emissive={colorHex}
        emissiveIntensity={1.4}
        toneMapped={false}
      />
    </mesh>
  );
};

/* ────────────────────────────────────
   Connecting lines between stars
   ──────────────────────────────────── */
interface ConstellationLinesProps {
  positions: [number, number, number][];
}

const ConstellationLines: React.FC<ConstellationLinesProps> = ({ positions }) => {
  if (positions.length < 2) return null;

  return (
    <Line
      points={positions}
      color="#c98a9e"
      lineWidth={1}
      transparent
      opacity={0.18}
    />
  );
};

/* ────────────────────────────────────
   ParticleField — розсіяні тьмяні частинки
   ──────────────────────────────────── */
function generateParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  return arr;
}

const PARTICLE_POSITIONS = generateParticlePositions(120);

const ParticleField: React.FC = () => {
  const positions = PARTICLE_POSITIONS;

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c9a66b"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

/* ────────────────────────────────────
   Генерація позицій зірок на сфері
   ──────────────────────────────────── */
function generateStarPositions(count: number, radius: number = 3.5): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1 || 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions.push([
      Math.cos(theta) * radiusAtY * radius,
      y * radius,
      Math.sin(theta) * radiusAtY * radius,
    ]);
  }
  return positions;
}

/* ────────────────────────────────────
   KittyMemoryConstellation
   ──────────────────────────────────── */
export const KittyMemoryConstellation: React.FC = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [daysTogether, setDaysTogether] = useState(() => {
    const diff = Date.now() - DEFAULT_START_DATE.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });
  const [greeting] = useState(() => getGreetingPartsByHour(new Date().getHours()));
  const [marginNote] = useState(
    () => RANDOM_MARGIN_NOTES[Math.floor(Math.random() * RANDOM_MARGIN_NOTES.length)]
  );

  useEffect(() => {
    datesService.getDates().then(setDates);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - DEFAULT_START_DATE.getTime();
      setDaysTogether(Math.floor(diff / (1000 * 60 * 60 * 24)));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const starPositions = useMemo(
    () => generateStarPositions(Math.max(dates.length, 1)),
    [dates.length]
  );

  const starSeeds = useMemo(
    () =>
      dates.map((_, i) => ({
        scale: 0.8 + ((i * 7 + 3) % 10) / 20,
        phase: ((i * 13 + 5) % 20) / 20 * Math.PI * 2,
      })),
    [dates]
  );

  const colorPalette = ['#c9a66b', '#c98a9e', '#e3cfa4', '#d99cae'];

  const handleStarTap = useCallback((label: string, screenPos: { x: number; y: number }) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip({ text: label, x: screenPos.x, y: screenPos.y });
    tooltipTimeout.current = setTimeout(() => setTooltip(null), 3000);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setTooltip(null);
  }, []);

  const declensionDay = useMemo(() => {
    const mod10 = daysTogether % 10;
    const mod100 = daysTogether % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'днів';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дні';
    return 'днів';
  }, [daysTogether]);

  return (
    <div className={styles.wrapper}>
      {/* 3D Canvas */}
      <div className={styles.canvasContainer} onClick={handleCanvasClick}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.6} />

          <ParticleField />

          {dates.map((date, i) => (
            <Star
              key={date.id}
              position={starPositions[i]}
              label={date.title}
              colorHex={colorPalette[i % colorPalette.length]}
              baseScale={starSeeds[i]?.scale ?? 1}
              phaseOffset={starSeeds[i]?.phase ?? 0}
              onTap={handleStarTap}
            />
          ))}

          <ConstellationLines positions={starPositions.slice(0, dates.length)} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            dampingFactor={0.12}
            enableDamping
          />
        </Canvas>
      </div>

      {/* Tooltip при кліку на зірку */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 48}px`,
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Центральний overlay з лічильником */}
      <div className={styles.overlay}>
        <span className={styles.daysNumber}>{daysTogether}</span>
        <span className={styles.daysLabel}>{declensionDay} разом</span>
        <span className={styles.greetingText}>
          {greeting.accent}
        </span>
        {marginNote && (
          <span className={styles.marginNote}>{marginNote}</span>
        )}
      </div>
    </div>
  );
};
