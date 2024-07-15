'use client'

import React, { useEffect, useRef } from 'react';

const ConfettiCanvas = () => {
  const canvasRef = useRef(null);
  const maxConfettis = 150;
  const particles = [];

  const possibleColors = [
    "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue",
    "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate",
    "Crimson"
  ];

  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function confettiParticle() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight - window.innerHeight;
    this.r = randomFromTo(11, 33);
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = (context) => {
      context.beginPath();
      context.lineWidth = this.r / 2;
      context.strokeStyle = this.color;
      context.moveTo(this.x + this.tilt + this.r / 3, this.y);
      context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
      context.stroke();
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    
    canvas.width = W;
    canvas.height = H;

    for (let i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }

    const draw = () => {
      const results = [];
      requestAnimationFrame(draw);
      context.clearRect(0, 0, W, H);

      for (let i = 0; i < maxConfettis; i++) {
        particles[i].draw(context);
        const particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 4) / 4;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 7.5;

        if (particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      return results;
    };

    window.addEventListener("resize", () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

    draw();
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>
  );
};

export default ConfettiCanvas;
