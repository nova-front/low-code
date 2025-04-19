import React, { useEffect, useRef, CSSProperties } from "react";

interface WaveUnderlineProps {
  ranges: { startOffset: number; endOffset: number; height: number }[];
  color?: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  style?: CSSProperties;
}

export const WaveUnderline: React.FC<WaveUnderlineProps> = ({
  ranges = [],
  color = "#ff0000",
  width = 100,
  height = 100,
  top = 0,
  left = 0,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 绘制波浪线的方法
  const drawWavyLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    endX: number,
    y: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(startX, y);

    const wavelength = 8; // 波长
    const amplitude = 2; // 振幅

    for (let x = startX; x <= endX; x += 2) {
      const radians = ((x - startX) * Math.PI) / wavelength;
      ctx.lineTo(x, y + Math.sin(radians) * amplitude);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // 绘制主逻辑
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 高清屏适配
    const scale = window.devicePixelRatio;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // 清空并重新绘制
    ctx.clearRect(0, 0, width, height);
    ranges.forEach((range) => {
      drawWavyLine(ctx, range.startOffset, range.endOffset, range.height - 3);
    });
  }, [width, height, ranges, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};
