import { useRef } from 'react';
import cheersSound from './assets/son/a.mp3';
import './AchievedGoal.css';
import React, { useState, useEffect } from 'react';
let Firework = ({name}) => {
 
  let audioRef = useRef(null);
   let canvasRef = useRef(null);
   let shells = useRef([]);
   let pass = useRef([]);
   let colors = useRef([
     '#FF5252',
     '#FF4081',
     '#E040FB',
     '#7C4DFF',
     '#536DFE',
     '#448AFF',
     '#40C4FF',
     '#18FFFF',
     '#64FFDA',
     '#69F0AE',
     '#B2FF59',
     '#EEFF41',
     '#FFFF00',
     '#FFD740',
     '#FFAB40',
     '#FF6E40'
   ]);
 
   useEffect(() => {
     let canvas = canvasRef.current;
     let ctx = canvas.getContext('2d');
     let cwidth, cheight;
     let lastRun = 0;
 
     let reset = () => {
       cwidth = window.innerWidth;
       cheight = window.innerHeight;
       canvas.width = cwidth;
       canvas.height = cheight;
     };
 
     let newShell = () => {
       let left = Math.random() > 0.5;
       let shell = {};
       shell.x = 1 * left;
       shell.y = 1;
       shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
       shell.yoff = 0.01 + Math.random() * 0.007;
       shell.size = Math.random() * 6 + 3;
       shell.color = colors.current[Math.floor(Math.random() * colors.current.length)];
 
       shells.current.push(shell);
     };
 
     let newPass = (shell) => {
       let pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
 
       for (let i = 0; i < pasCount; i++) {
         let pas = {};
         pas.x = shell.x * cwidth;
         pas.y = shell.y * cheight;
 
         let a = Math.random() * 4;
         let s = Math.random() * 10;
 
         pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
         pas.yoff = s * Math.sin(a * (Math.PI / 2));
 
         pas.color = shell.color;
         pas.size = Math.sqrt(shell.size);
 
         if (pass.current.length < 1000) {
           pass.current.push(pas);
         }
       }
     };
 
     let run = () => {
         newShell();
       
 
       let dt = 1;
       if (lastRun !== 0) {
         dt = Math.min(50, performance.now()-lastRun );
       }
       lastRun = performance.now();
 
       
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, cwidth, cheight);

  // Dessiner le texte
  ctx.fillStyle = 'white';
  ctx.font = '100px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name, cwidth / 2, cheight / 2);

  if (shells.current.length < 10 && Math.random() > 0.96) {
    newShell();
  }

  // Le reste du code pour dessiner les feux d'artifice...


       ctx.fillStyle = 'rgba(0,0,0,0.25)';
       ctx.fillRect(0, 0, cwidth, cheight);
 
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
 
       requestAnimationFrame(run);
     };
 
     window.addEventListener('resize', reset);
     reset();
     run();
 
     return () => {
        
       window.removeEventListener('resize', reset);
     
     };
   }, []);
 
 
  
 
 
   return (         
 <div>
    <canvas ref={canvasRef} id="Canvas">
    </canvas>
    {/*<audio src={fireworkSound} />*/}
  </div>        
   )
 };

const AchievedGoal = ({ name }) => {
  const cheersAudioRef = useRef(null);

  const handleAnimationEnd = () => {
    cheersAudioRef.current.play();
  };
  
  return (
    <div className="achieved-goal" onClick={handleAnimationEnd} >
        <Firework name={name}/>
        <audio ref={cheersAudioRef} src={cheersSound} />
     </div>
  );
};

export default AchievedGoal;