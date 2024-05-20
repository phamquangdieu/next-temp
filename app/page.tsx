'use client';
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from "react";

export default function Home() {
  const tilt = useRef(null);
  const tilt1 = useRef(null);


  useEffect(() => {
    if (tilt.current) {
      VanillaTilt.init(tilt.current, {
        max: 25,
        speed: 400
      });
    }
    if (tilt1.current) {
      VanillaTilt.init(tilt1.current, {
        max: 25,
        speed: 400
      });
    }
  }, []);

  return (
    <div>
      <div className="container">
        <div className="card-container" ref={tilt}>
          <div className="content">
            <div className="number">01</div>
            <div className="title">Hello world</div>
          </div>
        </div>
        <div className="card-container" ref={tilt1}>
          <div className="content">
            <div className="number">02</div>
            <div className="title">Hello world!!!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
