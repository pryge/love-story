'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import styles from './KittyMosaicReveal.module.css';

interface KittyMosaicRevealProps {
  imageSrc: string;
  word?: string;
  progress: number; // 0..1
  width?: number;
  height?: number;
}

/**
 * Canvas-based component that renders a photo as a mosaic of repeating text.
 * As progress increases (0→1), the grid becomes finer and the image clearer.
 * At progress=1, crossfades to the actual photo.
 */
export const KittyMosaicReveal: React.FC<KittyMosaicRevealProps> = ({
  imageSrc,
  word = 'КИЦЯ',
  progress,
  width = 400,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageLoadedRef = useRef(false);

  /* ── Load image once ── */
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      imageLoadedRef.current = true;
    };
    img.src = imageSrc;
  }, [imageSrc]);

  /* ── Render mosaic on each progress change ── */
  const renderMosaic = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageLoadedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear
    ctx.clearRect(0, 0, cw, ch);

    // Determine grid size based on progress: 
    // at 0 → coarse (8 cols), at 1 → fine (60 cols)
    const minCols = 8;
    const maxCols = 60;
    const cols = Math.round(minCols + (maxCols - minCols) * Math.min(progress, 0.95));
    const cellW = cw / cols;
    const cellH = cellW * 1.2; // slightly taller cells for text
    const rows = Math.ceil(ch / cellH);

    // Draw image to offscreen canvas to sample colors
    const offscreen = document.createElement('canvas');
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.drawImage(img, 0, 0, cols, rows);
    const pixelData = offCtx.getImageData(0, 0, cols, rows).data;

    // Set font for text cells
    const fontSize = Math.max(cellW * 0.7, 4);
    ctx.font = `bold ${fontSize}px var(--font-manrope), monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pixelIdx = (row * cols + col) * 4;
        const r = pixelData[pixelIdx];
        const g = pixelData[pixelIdx + 1];
        const b = pixelData[pixelIdx + 2];

        // Calculate brightness to modulate opacity
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const alpha = 0.5 + (1 - brightness) * 0.5; // darker areas → more opaque

        const charIdx = (row * cols + col) % word.length;
        const char = word[charIdx];

        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillText(char, x, y);
      }
    }
  }, [progress, word]);

  useEffect(() => {
    renderMosaic();
  }, [renderMosaic]);

  // Also re-render when image loads
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageLoadedRef.current) {
        renderMosaic();
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [renderMosaic]);

  const showRealPhoto = progress >= 0.95;

  return (
    <div
      className={styles.container}
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        style={{
          opacity: showRealPhoto ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      />
      {/* Real photo crossfade */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className={styles.realPhoto}
        style={{
          opacity: showRealPhoto ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  );
};
