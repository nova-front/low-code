import React, { useEffect, useRef, memo, useState } from "react";

// 绘制点
interface RangeProps {
  startOffset: number;
  endOffset: number;
  height: number;
}

interface WaveUnderlineProps {
  ranges: RangeProps[]; // 绘制位置
  color?: string; // 波浪线颜色
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

export const WaveUnderline: React.FC<WaveUnderlineProps> = memo(
  ({
    ranges = [],
    color = "#ff0000",
    width = 100,
    height = 100,
    top = 0,
    left = 0,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const workerRef = useRef<Worker | null>(null);
    const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);

    // 创建 Web Worker (使用 Blob 动态创建)
    useEffect(() => {
      // Worker 代码函数
      const workerFunction = function () {
        onmessage = function (e) {
          const { ranges, width, height, color } = e.data;
          const canvas = new OffscreenCanvas(width, height);
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // 处理绘制逻辑
            const drawWavyLine = (startX: number, endX: number, y: number) => {
              ctx.beginPath();
              ctx.moveTo(startX, y);
              const wavelength = 8;
              const amplitude = 2;
              for (let x = startX; x <= endX; x += 2) {
                const radians = ((x - startX) * Math.PI) / wavelength;
                ctx.lineTo(x, y + Math.sin(radians) * amplitude);
              }
              ctx.strokeStyle = color;
              ctx.lineWidth = 2;
              ctx.stroke();
            };

            ranges.forEach(
              (range: {
                startOffset: number;
                endOffset: number;
                height: number;
              }) => {
                drawWavyLine(
                  range.startOffset,
                  range.endOffset,
                  range.height - 3
                );
              }
            );

            postMessage(canvas.transferToImageBitmap());
          }
        };
      };

      // 创建 Blob 对象并生成 Worker
      const workerBlob = new Blob([`(${workerFunction.toString()})()`], {
        type: "application/javascript",
      });
      const worker = new Worker(URL.createObjectURL(workerBlob));
      workerRef.current = worker;

      return () => {
        workerRef.current?.terminate();
      };
    }, []);

    // 向 Worker 发送消息并获取图像
    useEffect(() => {
      const worker = workerRef.current;
      if (!worker || !canvasRef.current) return;

      worker.onmessage = (e) => {
        setImageBitmap(e.data); // 获取 Worker 返回的图像数据
      };

      worker.postMessage({
        ranges,
        width,
        height,
        color,
      });
    }, [ranges, width, height, color]);

    // 在 canvas 上绘制图像
    useEffect(() => {
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imageBitmap) return;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // 获取设备像素比，适配高清屏
          const scale = window.devicePixelRatio || 1;

          // 设置 canvas 的实际宽高
          canvas.width = width * scale;
          canvas.height = height * scale;

          // 对 canvas 进行缩放，确保它能正常显示
          ctx.scale(scale, scale);

          // 清空现有内容
          ctx.clearRect(0, 0, width, height);

          // 绘制图像
          ctx.drawImage(imageBitmap, 0, 0);
        }
      });
    }, [imageBitmap, width, height]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`, // CSS 层面显示尺寸
          height: `${height}px`,
          pointerEvents: "none",
          transform: "translateZ(0)", // GPU 加速
        }}
      />
    );
  }
);
