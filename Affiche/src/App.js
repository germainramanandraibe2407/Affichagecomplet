import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';
import AchievedGoal from './AchievedGoal';
import API_IP from './Config';
import io from 'socket.io-client';
import cheersSound from './assets/son/c.mp3';

import cheersSound2 from './assets/son/d.mp3';
import Swal from "sweetalert2";


const getRowClass = (nbr) => {
  let nbrledetequivalentled = parseFloat(((nbr * 100) / 300).toFixed(1));

  switch (true) {
    case nbrledetequivalentled >= 100:
      return 'succes';
    case nbrledetequivalentled < 100 && nbrledetequivalentled>=75:
      return 'normalsucces';
    case nbrledetequivalentled >= 50 && nbrledetequivalentled <75:
      return 'normal';
    case nbrledetequivalentled >= 25 && nbrledetequivalentled < 50:
      return 'echec2';
    default:
      return 'echec';
  }

/*  if (nbrledetequivalentled >= 100) {
    return 'succes'}*/
/*
  if (nbrledetequivalentled >= 300) {
    return 'succes';
  } else if (nbrledetequivalentled >= 100 && nbrledetequivalentled < 300) {
    return 'normalsucces';
  } else if (nbrledetequivalentled >= 50 && nbrledetequivalentled < 100) {
    return 'normal';
  } else if (nbrledetequivalentled >= 25 && nbrledetequivalentled < 50) {
    return 'echec2';
  } else {
    return 'echec';
  }*/


}

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [alertedPersons, setAlertedPersons] = useState([]);
  const [currentWinner0, setCurrentWinner0] = useState(null);
  const [currentWinner1, setCurrentWinner1] = useState(null);
  const [currentWinner2, setCurrentWinner2] = useState(null);
  const [currentWinner3, setCurrentWinner3] = useState(null);
  const [congratulatedData300, setCongratulatedData300] = useState([]);
  const [congratulatedData350, setCongratulatedData350] = useState([]);
  const [congratulatedData400, setCongratulatedData400] = useState([]);
  const audioRef = useRef(new Audio(cheersSound));
  const audioRef2 = useRef(new Audio(cheersSound2));
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioLoaded2, setAudioLoaded2] = useState(false);
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [canPlayAudio2, setCanPlayAudio2] = useState(false);
  const [totalFiches, setTotalFiches] = useState(0)
  const [Totalequivled, setTotalequivled] = useState(0)

  const handleAudioLoaded = () => {
    setAudioLoaded(true);
  };
  const handleAudioLoaded2 = () => {
    setAudioLoaded2(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://${API_IP}:9000/api/productivite/read`);
        setData(res.data);
        const sumFiches = res.data.reduce((total, item) => total + item.nbrfiche, 0);
        const sumled = res.data.reduce((total, item) => total + item.nbrledetequivalentled, 0);
        setTotalFiches(sumFiches);
        setTotalequivled(sumled)
       
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Erreur de connection",
          icon: "question",
          text: "connection au serveur impossible. Veuillez vérifier votre connexion internet  et réessayez.",
          iconHtml: "؟",
          confirmButtonText: "Réessayer",
         
         
          showCloseButton: true,
          //timer: 60000 // L'alerte se fermera automatiquement après 5 secondes
        });
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  //alert fiche

  useEffect(() => {
    if (previousData.length > 0) {
      data.forEach((newItem) => {
        const oldItem = previousData.find(item => item.idproductivité === newItem.idproductivité);
        if (oldItem && newItem.nbrfiche > oldItem.nbrfiche) {
          setCurrentWinner0(newItem.prenompersonne);
        setTimeout(() => {
          setCurrentWinner0(null);
        }, 7000);
      //  setCongratulatedData300(prev => [...prev, item.prenompersonne]);
        setCanPlayAudio2(true);
        }
      });
    }
    setPreviousData(data);
  }, [data]);


  //resp affichage par 5
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex + 5 < data.length ? prevIndex + 5 : 0
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [data.length]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Mettre à jour l'état avec la date et l'heure actuelles toutes les secondes
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);





  useEffect(() => {
    data.forEach(item => {
      if (item.nbrledetequivalentled >= 300 && item.nbrledetequivalentled < 350 && !congratulatedData300.includes(item.prenompersonne)) {
        setCurrentWinner1(item.prenompersonne);
        setTimeout(() => {
          setCurrentWinner1(null);
        }, 5000);
        setCongratulatedData300(prev => [...prev, item.prenompersonne]);
        setCanPlayAudio(true);
      }
    });
    
  }, [data, congratulatedData300]);



  useEffect(() => {
    data.forEach(item => {
      if (item.nbrledetequivalentled >= 350 && item.nbrledetequivalentled < 400 && !congratulatedData350.includes(item.prenompersonne)) {
        setCurrentWinner2(item.prenompersonne);
        setTimeout(() => {
          setCurrentWinner2(null);
        }, 5000);
        setCongratulatedData350(prev => [...prev, item.prenompersonne]);
        setCanPlayAudio(true);
      }
    });
  }, [data, congratulatedData350]);

  useEffect(() => {
    data.forEach(item => {
      if (item.nbrledetequivalentled >= 400 && !congratulatedData400.includes(item.prenompersonne)) {
        setCurrentWinner3(item.prenompersonne);
        setTimeout(() => {
          setCurrentWinner3(null);
        }, 5000);
        setCongratulatedData400(prev => [...prev, item.prenompersonne]);
        setCanPlayAudio(true);
      }
    });
  }, [data, congratulatedData400]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 5 < data.length ?prevIndex + 5:0));
     // alert (data.length )
    }, 2000);

    return () => clearInterval(timer);
  }, [data.length]);

 /* useEffect(() => {
    const socket = io(`http://${API_IP}:9000`);

    socket.on('dataUpdate', () => {
      window.location.reload();
    });

    socket.on('startAudio', () => {
      if (canPlayAudio && audioLoaded) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [canPlayAudio, audioLoaded]);*/

 

  const renderAchievedGoal = () => {
    if (currentWinner1) {
      return (
        <>
          <AchievedGoal name={currentWinner1} texte={'Objectif Atteint 300 Equivalent Led'} />
          <audio ref={audioRef} src={cheersSound} onLoadedData={handleAudioLoaded} autoPlay />
        </>
      );
    } else if (currentWinner2) {
      return (
        <>
          <AchievedGoal name={currentWinner2} texte={'Objectif dépassé 350 Equivalent Led'} />
          <audio ref={audioRef} src={cheersSound} onLoadedData={handleAudioLoaded} autoPlay />
        </>
      );
    } else if (currentWinner3) {
      return (
        <>
          <AchievedGoal name={currentWinner3} texte={'Impressionnant 400 Equivalent Led'} />
          <audio ref={audioRef} src={cheersSound} onLoadedData={handleAudioLoaded} autoPlay />
        </>
      );
    }
    else if (currentWinner0) {
      return (
        <>
          <AchievedGoal name={currentWinner0} texte={'Vous avez obtenu une nouvelle fiche'} />
          <audio ref={audioRef2} src={cheersSound2} onLoadedData={handleAudioLoaded2} autoPlay />
        </>
      );
    }
    return null;
  };

  return (
    <div className="body">
      {currentWinner1 || currentWinner2 || currentWinner3 || currentWinner0 ? (
        renderAchievedGoal()
      ) : (
        <table className={`leaderboard`}>
          <thead>
            <tr>
              <th>rang</th>
              <th>nom</th>
              <th>Nombre de Fiches</th>
              <th>Equivalent en Led</th>
              <th>pourcentage réalisation</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(currentIndex, currentIndex + 5).map((item, index) => (
              <tr key={item.id} className={`show-${index}`}>
                <td>{currentIndex + index + 1}</td>
                <td>{item.prenompersonne.toUpperCase()}</td>
                <td>{item.nbrfiche}</td>
                <td>{item.nbrledetequivalentled}</td>
                <td className={getRowClass(item.nbrledetequivalentled)}>
                  {parseFloat(((item.nbrledetequivalentled * 100) / 300).toFixed(0))} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!currentWinner1 && !currentWinner2 && !currentWinner3 && !currentWinner0 && (
        <footer className="footer">
          <div className="scrolling-text">
            <span id="date-time">{currentDateTime.toLocaleString() }  Nombre Total de Fiches:
               {totalFiches} Total équivalent Led :  {Totalequivled} </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
