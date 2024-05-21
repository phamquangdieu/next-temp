'use client';
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from "react";
import styles from './styles.module.css';
import GlassCard from './card';

export default function Home() {
  return (
    <div className={styles.glassCard}>
      <div className={styles.container}>
        <GlassCard number="01" title="hell" />
        <GlassCard number="02" title="hello" />
        <GlassCard number="03" title="hello world" />
      </div>
    </div>
  );
}
