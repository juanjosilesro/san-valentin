import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [showSignature, setShowSignature] = useState(false);
  const audioRef = useRef(null);

  const message = `
Feliz San Valentín (nuestro primer San Valentín) 💖

Mi Pecas
Mi dulce de leche
Mi princesa hermosa
Mi todo…

Desde que llegaste a mi vida, todo tiene más color,
más calma y más felicidad.

Gracias por tu sonrisa,
por tu ternura,
por tu manera tan única de hacerme sentir amado.

No hay un solo día en el que no agradezca
tenerte a mi lado.

Eres mi hogar.
Eres mi paz.
Eres mi amor infinito.

Te amo, Nicky ❤️
  `;

  useEffect(() => {
    if (open) {
      let i = 0;
      const interval = setInterval(() => {
        setText(message.slice(0, i));
        i++;
        if (i > message.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowSignature(true);
          }, 1500);
        }
      }, 35);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.6; // volumen cómodo
      audioRef.current.play();
    }
  };

  return (
    <div className="container">
    <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/luna.mp3`} loop />

      {!open && (
        <div className="envelope" onClick={handleOpen}>
          💌 Para Nicky, mi Pecas
        </div>
      )}

      {open && (
        <div className="letter">
          <pre>{text}</pre>

          {showSignature && (
            <div className="signature">
              <p className="closing">
                Y si algún día dudas cuánto te amo,
                solo mira mis ojos…
                ahí siempre vas a estar tú.
              </p>

              <p className="firm">
                Con amor,
              </p>

              <h2 className="name">
                Tu solcito ☀️
              </h2>
            </div>
          )}

        </div>
      )}

      {showSignature && (
        <div className="heartRain">
          {[...Array(30)].map((_, i) => (
            <span key={i} style={{ left: Math.random() * 100 + "%" }}></span>
          ))}
        </div>
      )}
    </div>
  );
}
