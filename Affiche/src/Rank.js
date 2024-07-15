import axios from "axios";
import React, { useEffect, useState } from "react";
import './Leaderboard.css'; // Import the CSS file for styling
import API_IP from "./Config"

const Rank = () => {

      let [data, setData] =useState([]);
      useEffect(() => {
            const fetchData = async () => {
              try {
                const res = await axios.get(`http://${API_IP}:9000/api/productivite/read`);
                setData(res.data);
                console.log(data);
              } catch (err) {
                console.log(err);
              }
            };
        
            const interval = setInterval(fetchData, 3000); // Mise à jour toutes les 3 secondes
        
            return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
          }, []);
  return (
    <>
         
          <div className='titre'>{'Productivité'.toUpperCase()}
          </div>
       
          <div className='entete'>
            
          {data.length > 0 && (
          <>
            <div className="box box1">
              <div className="profile-pic1"></div>
              <div className="name">{data[1]?data[1].prenompersonne.toUpperCase():""}</div>
              <div className="achievement">{data[1]?parseFloat(((data[1].nbrledetequivalentled*100/300)).toFixed(0)):""}%</div>
            </div>
            <div className="box box2 smaller-box">
              <div className="profile-pic2"></div>
              <div className="name">{data[0]?data[0].prenompersonne.toUpperCase():""}</div>
              <div className="achievement">{data[0]?parseFloat(((data[0].nbrledetequivalentled*100/300)).toFixed(0)):""}%</div>
            </div>
            <div className="box box3">
              <div className="profile-pic3"></div>
              <div className="name">{data[2]?data[2].prenompersonne.toUpperCase():""}</div>
              <div className="achievement">{data[2]?parseFloat(((data[2].nbrledetequivalentled*100/300)).toFixed(0)):""}%</div>
            </div>
          </>
        )}
          </div>
    </>
   
  )
};

export default Rank;