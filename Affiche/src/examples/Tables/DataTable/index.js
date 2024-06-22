import React, { useState, useEffect } from 'react';
import './Leaderboard.css'; // Import the CSS file for styling
import Fireworks from './Fireworks';
const Tables = () => {
  const [showTable1, setShowTable1] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable1(!showTable1);
    }, 3000); // Délai de 3 secondes avant de passer au tableau suivant
    return () => clearTimeout(timer);
  }, [showTable1]);

  return (
    <div>

      {showTable1 ? (
        
    <table className="leaderboard">
      <thead>
        <tr >
          <th>Idendifiant</th>
          <th>Nombre de Fiches</th>
          <th>Equivalent en Led</th>
          <th>Atteinte objectif(300Leds)</th>
        </tr>
      </thead>
    <tbody>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td className='succes'>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td className='normal'>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td>354%</td>
      </tr>
      <tr >
        <td>Miora</td>
        <td>5</td>
        <td>1063</td>
        <td className='echec'>354%</td>
      </tr>
    </tbody> 
    </table>):(
        <table className="leaderboard">
        <thead>
          <tr >
            <th>Idendifiant</th>
            <th>Nombre de Fiches</th>
            <th>Equivalent en Led</th>
            <th>Atteinte objectif(300Leds)</th>
          </tr>
        </thead>
      <tbody>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td className='succes'>354%</td>
        </tr>
        <tr >
          <td>Miora2</td>
          <td>5</td>
          <td>1064</td>
          <td className='normal'>354%</td>
        </tr>
        <tr >
          <td>Miora8</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>35%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td>Miora</td>
          <td>5</td>
          <td>1063</td>
          <td>354%</td>
        </tr>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td>.</td>
        </tr>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td>.</td>
        </tr>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td>.</td>
        </tr>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td >.</td>
        </tr>
      </tbody> 
      </table>
    )
     }
     </div>


)
};

export default Tables;