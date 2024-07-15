import React, { useRef, useState, useEffect } from 'react';
import cheersSound from './assets/son/c.mp3';
import './AchievedGoal.css';

const Firework = ({ name, texte }) => {
  const canvasRef = useRef(null);
  const shells = useRef([]);
  const pass = useRef([]);
  const colors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let cwidth, cheight;
    let lastRun = 0;
    let animationFrameId;

    const reset = () => {
      cwidth = window.innerWidth;
      cheight = window.innerHeight;
      canvas.width = cwidth;
      canvas.height = cheight;
    };

    const drawText = (ctx, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      let yPos = y;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, x, yPos);
          line = words[i] + ' ';
          yPos += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, yPos);
    };

    const newShell = () => {
      const left = Math.random() > 0.5;
      const shell = {
        x: 1 * left,
        y: 1,
        xoff: (0.01 + Math.random() * 0.007) * (left ? 1 : -1),
        yoff: 0.01 + Math.random() * 0.007,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      shells.current.push(shell);
    };

    const newPass = (shell) => {
      const pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
      for (let i = 0; i < pasCount; i++) {
        const pas = {
          x: shell.x * cwidth,
          y: shell.y * cheight,
          xoff: Math.sin((10 - Math.random() * 40) * (Math.PI / 2)) * Math.random() * 20,
          yoff: Math.sin(Math.random() * 40 * (Math.PI / 2)) * Math.random() * 20,
          color: shell.color,
          size: Math.sqrt(shell.size)
        };
        if (pass.current.length < 1000) {
          pass.current.push(pas);
        }
      }
    };

    const run = () => {
      newShell();

      let dt = 1;
      if (lastRun !== 0) {
        dt = Math.min(50, performance.now() - lastRun);
      }
      lastRun = performance.now();

      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, cwidth, cheight);

      ctx.fillStyle = 'white';
      ctx.font = '50px sans-serif'; // Adjusted font size for better fit
      ctx.textAlign = 'center';

      const fullText = `Félicitation ${name}: ${texte}`;
      const maxWidth = cwidth - 40; // Largeur maximale pour le texte
      const lineHeight = 30; // Hauteur de ligne
      drawText(ctx, fullText, cwidth / 2, cheight / 2, maxWidth, lineHeight);

      if (shells.current.length < 10 && Math.random() > 0.96) {
        newShell();
      }

      shells.current.forEach((shell, ix) => {
        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= shell.xoff * dt * 0.001;
        shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

        if (shell.yoff < -0.005) {
          newPass(shell);
          shells.current.splice(ix, 1);
        }
      });

      pass.current.forEach((pas, ix) => {
        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= pas.xoff * dt * 0.001;
        pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
        pas.size -= dt * 0.002 * Math.random();

        if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
          pass.current.splice(ix, 1);
        }
      });

      animationFrameId = requestAnimationFrame(run);
    };

    window.addEventListener('resize', reset);
    reset();
    run();

    return () => {
      window.removeEventListener('resize', reset);
      cancelAnimationFrame(animationFrameId);
    };
  }, [name, texte]);

  return (
    <div>
      <canvas ref={canvasRef} id="Canvas"></canvas>
    </div>
  );
};

const AchievedGoal = ({ name, texte, delayMs }) => {
  const cheersAudioRef = useRef(new Audio(cheersSound)); // Utilisation de new Audio pour créer l'élément audio
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    const audio = cheersAudioRef.current;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    if (showContent) {
     // playAudio();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [showContent]);

  return (
    <>
      {showContent && (
        <div className="achieved-goal">
          <Firework name={name} texte={texte} />
        </div>
      )}
    </>
  );
};

export default AchievedGoal;
