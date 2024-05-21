import React, { MutableRefObject, ReactNode, forwardRef, useEffect, useRef } from 'react'
import styles from './styles.module.css';
import VanillaTilt from 'vanilla-tilt';
// export type Ref = HTMLDivElement | null;

interface Props {
    children?: ReactNode;
    number: string;
    title: string;
  }

// const GlassCard = forwardRef<Ref>((props, ref ) => {
//     const tmpRef = ref as MutableRefObject<HTMLDivElement>;
//     useEffect(() => {
//         if (tmpRef) {
//           VanillaTilt.init(tmpRef.current, {
//             max: 25,
//             speed: 400
//           });
//         }
//       }, []);
//     return (
//         <div className={styles.cardContainer} ref={ref}>
//           <div className={styles.content}>
//             <div className={styles.number}>01</div>
//             <div className={styles.title}>Hello world</div>
//           </div>
//         </div>
//     );
// })

// GlassCard.displayName = 'GlassCard';

const GlassCard = ({ children, number, title } : Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref.current) {
        VanillaTilt.init(ref.current, {
            max: 25,
            speed: 400
        });
        }
    }, []);
    return (
        <div className={styles.cardContainer} ref={ref}>
          <div className={styles.content}>
            <div className={styles.number}>{number}</div>
            <div className={styles.title}>{title}</div>
          </div>
        </div>
    )
}
 
export default GlassCard;