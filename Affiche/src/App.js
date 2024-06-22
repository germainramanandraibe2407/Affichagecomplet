import axios from "axios";
import React, { useEffect, useState } from "react";
import './Leaderboard.css'; // Import the CSS file for styling
import AchievedGoal from './AchievedGoal';
import API_IP from "./Config"
import io from 'socket.io-client';


const App = () => {
  const [showTable, setShowTable] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  let [data, setData] =useState([]);

  
  useEffect(()=>{
          axios.get(`http://${API_IP}:3005/api/productivite/read`)
          .then(res =>{setData(res.data)
          }
          )
          .catch(err => console.log(err)); },[])

    useEffect(() => {
            const socket = io(`http://${API_IP}:3005`); // Remplacez l'URL par votre endpoint de socket
        
            socket.on('dataUpdate', () => {
             
              setShowAlert(true);
            });
        
            return () => {
              socket.disconnect();
            };
          }, []);

          
  useEffect(() => {
    if (showAlert) {
      window.location.reload()
      setShowAlert(false);
    }
  }, [showAlert]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(!showTable);
    }, 10000); // Délai de 3 secondes avant de passer au tableau suivant
    return () => clearTimeout(timer);
  }, [showTable]);

  return (
    
      <div>
      <table className={`leaderboard`}>
        <thead>
          <tr>
            <th>rang</th>
            <th>nom</th>
            <th>Idendifiant</th>
            <th>Nombre de Fiches</th>
            <th>Equivalent en Led</th>
            <th>Atteinte objectif(300Leds)</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 8).map((item, index) => (
            <tr key={item.id} className="show">
              <td>{index + 1}</td>
              <td>{item.prenompersonne}</td>
              <td>{item.nbrfiche}</td>
              <td>{item.nbrdouchette}</td>
              <td>{item.nbraerateur}</td>
              <td>{data.length}</td>
            </tr>
          ))}
           {data.slice(8, 16).map((item, index) => (
            <tr key={item.id} className="show1">
              <td>{index + 1}</td>
              <td>{item.prenompersonne}</td>
              <td>{item.nbrfiche}</td>
              <td>{item.nbrdouchette}</td>
              <td>{item.nbraerateur}</td>
              <td>{data.length}</td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
   
     
    
)
};

export default App;