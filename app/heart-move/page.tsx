'use client';
import React, { useEffect } from 'react';
import styles from './styles.module.css';

let prevMouseX: null | number = null;
let prevMouseY: null | number = null;
const validateCondition = (event: MouseEvent) => {
  if (prevMouseX && prevMouseY) {
    let deltaX = event.pageX - prevMouseX;
    let deltaY = event.pageY - prevMouseY;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance >= 50) {
      createHearts(event.pageX, event.pageY);
      prevMouseX = event.pageX;
      prevMouseY = event.pageY;
    }
  } else {
    createHearts(event.pageX, event.pageY);
    prevMouseX = event.pageX;
    prevMouseY = event.pageY;
  }
};

const createHearts = (x: number, y: number) => {
  let i = document.createElement('i');
  const container = document.getElementById('heart-move');
  container?.appendChild(i);
  i.style.top = y + 'px';
  i.style.left = x + 'px';
  i.style.scale = `${Math.random() * 2 + 0.5}`;
  i.style.setProperty('--x', `${Math.random() * 400 - 200}px`);
  i.style.setProperty('--y', `${Math.random() * 400 - 200}px`);
  setTimeout(() => {
    container?.removeChild(i);
  }, 2000);
};
const HeartMove = () => {
  useEffect(() => {
    document.addEventListener('mousemove', validateCondition);
    return () => document.removeEventListener('mousemove', validateCondition);
  }, []);
  return <div id="heart-move" className={styles.container}></div>;
};

export default HeartMove;
