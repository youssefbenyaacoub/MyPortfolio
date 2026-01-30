import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Removed the expensive MousePosition hook that was causing full-component re-renders on every mouse move.


function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isVisible.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef(null);
  const resizeTimeout = useRef(null);

  const isVisible = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };


  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);

      // Clear existing particles and create new ones with exact quantity
      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);
  const rgbString = rgb.join(", ");

  const drawCircle = (circle) => {
    if (context.current) {
      const { x, y, size, alpha } = circle;
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgbString}, ${alpha})`;
      context.current.fill();
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams();
      circles.current.push(circle);
      drawCircle(circle);
    }
  };

  const animate = () => {
    if (!isVisible.current) {
      rafID.current = window.requestAnimationFrame(animate);
      return;
    }
    clearContext();
    const { w, h } = canvasSize.current;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    for (let i = 0; i < circles.current.length; i++) {
      const circle = circles.current[i];

      // Alpha calculation
      const dx_edge = circle.x - circle.size;
      const dy_edge = circle.y - circle.size;
      const closestEdge = Math.min(dx_edge, w - circle.x - circle.size, dy_edge, h - circle.y - circle.size);

      if (closestEdge < 20) {
        circle.alpha = circle.targetAlpha * (closestEdge / 20);
      } else {
        circle.alpha = Math.min(circle.targetAlpha, circle.alpha + 0.02);
      }

      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      const targetX = mx / (staticity / circle.magnetism);
      const targetY = my / (staticity / circle.magnetism);
      circle.x += (targetX - (circle.x - circle.baseX)) / ease;
      circle.y += (targetY - (circle.y - circle.baseY)) / ease;

      drawCircle(circle);

      if (circle.x < -circle.size || circle.x > w + circle.size || circle.y < -circle.size || circle.y > h + circle.size) {
        circles.current[i] = circleParams();
      }
    }
    rafID.current = window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

Particles.propTypes = {
  className: PropTypes.string,
  quantity: PropTypes.number,
  staticity: PropTypes.number,
  ease: PropTypes.number,
  size: PropTypes.number,
  refresh: PropTypes.bool,
  color: PropTypes.string,
  vx: PropTypes.number,
  vy: PropTypes.number,
};
