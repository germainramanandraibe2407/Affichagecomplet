import React, { useState, useEffect } from 'react';
import './Leaderboard.css'; // Import the CSS file for styling
const Rank = () => {

 

  return (
    <>
          <div className='titre'>Leaderboard
          </div>
          <div className='entete'>
              <div className="box box1">
                    <div className="profile-pic1"  ></div>
                    <div className="name">Naivo</div>
                    <div className="achievement">Objectif atteint :354%</div>
              </div>
              <div className="box box2 smaller-box">
                    <div className="profile-pic2" ></div>
                    <div className="name">Miora</div>
                    <div className="achievement">Objectif atteint : 354%</div>
              </div>
              <div className="box box3">
                    <div className="profile-pic3" ></div>
                    <div className="name">Miora</div>
                    <div className="achievement">Objectif atteint :354%</div>
              </div>
          </div>
    </>
   
  )
};

export default Rank;