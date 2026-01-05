"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gap = 20;
    const dotRadius = 3;
    const dotColor = "#e5e5e534";

    // redimensionnement et dessin
    const resizeAndDraw = () => {
      // récupére taille du conteneur parent
      const { width, height } = container.getBoundingClientRect();
      
      // densité de pixels (Retina display)
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // ajuste style CSS = taille visuelle
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // normaliser le système de coordonnées
      ctx.scale(dpr, dpr);

      // dessiner
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      // gap/2 pour centrer le motif
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // initialisation
    resizeAndDraw();

    // observer les changements de taille du conteneur
    const resizeObserver = new ResizeObserver(() => {
      resizeAndDraw();
    });
    
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none rounded-xl overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(closest-side,#151515_0%,transparent_100%)]"></div>
      <canvas ref={canvasRef} />
    </div>
  );
}