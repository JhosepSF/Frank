import React, { useEffect, useState, useRef } from "react";
import "../../styles/Panel.css";

export function PanelPrincipal() {
  const frases = [
    "Eres mi razón de sonreír cada día 💖",
    "Te amo más que ayer y menos que mañana 🌹",
    "Contigo todo es mejor ✨",
    "Tu amor me da fuerzas cada día 💕",
    "Eres mi lugar favorito 💌",
    "Mi mundo es más bonito porque estás en él 🌎❤️"
  ];

  const FechaInicio = new Date("2024-11-02T00:00:00");
  const contenedorCorazones = useRef(null);
  const [tiempo, setTiempo] = useState('');
  const [frase, setFrase] = useState(frases[0]);

  useEffect(() => {
    generarCorazones();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diferencia = ahora - FechaInicio;
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      setTiempo(`${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`);
    }, 1000);

    const frasesIntervalo = setInterval(() => {
      setFrase(frases[Math.floor(Math.random() * frases.length)]);
    }, 7000);

    return () => {
      clearInterval(intervalo);
      clearInterval(frasesIntervalo);
    };
  }, []);

  const generarCorazones = () => {
    const contenedor = contenedorCorazones.current;
    contenedor.innerHTML = "";
    const cantidad = 35;
    for (let i = 0; i < cantidad; i++) {
      const corazon = document.createElement("div");
      corazon.className = "heart";
      corazon.style.left = `${Math.random() * 100}%`;
      corazon.style.animationDuration = `${4 + Math.random() * 5}s`;
      contenedor.appendChild(corazon);
    }
  };

  const reproducirMusica = () => {
    const audio = document.getElementById("musica");
    if (audio) {
      audio.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    }
  };

  return (
    <div className="container">
      <div className="heart-container" ref={contenedorCorazones}></div>
      <h1 className="titulo">💘 Feliz Día de la Novia 💘</h1>
      <h2 className="subtitulo">Para la mujer que ilumina mis días ✨</h2>
      <p className="mensaje">
        Hoy quiero recordarte lo mucho que te amo, 
        eres la razón de mis sonrisas y mi mayor fortuna 💖
      </p>
      <h3 className="frase">{frase}</h3>
      <p className="contador">Iniciamos hace...</p>
      <p className="contador-tiempo">{tiempo}</p>
      <div className="botones">
        <button onClick={generarCorazones}>💞 Lluvia de corazones</button>
        <button onClick={reproducirMusica}>🎵 Nuestra canción</button>
      </div>
      <audio id="musica" src="/Music/Solamentedan Que la Luna Sepa.mp3" loop></audio>
    </div>
  );
}
