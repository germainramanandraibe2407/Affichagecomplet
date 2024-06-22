import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const createParticles = (x, y) => {
      const particleCount = 30;
      const colors = ['#FF6138', '#FFBE53', '#2980B9', '#282741', '#FF6138', '#FFBE53'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x,
          y,
          xv: Math.random() * 10 - 5,
          yv: Math.random() * 10 - 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 5 + 1,
          alpha: 1,
        });
      }
    };

    const updateParticles = () => {
      particles.forEach((particle, index) => {
        particle.x += particle.xv;
        particle.y += particle.yv;
        particle.alpha -= 0.01;
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });
    };

    const playFireworkSound = () => {
      audioRef.current.play();
    };

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      createParticles(x, y);
      playFireworkSound();
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <audio ref={audioRef} src="firework_sound.mp3" />
    </div>
  );
};

export default Fireworks;