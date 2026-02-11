import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from './FloatingHearts';
import './CelebrationSection.css';

function burstConfetti() {
    const colors = ['#c9a96e', '#d4a0a0', '#722f37', '#f5e6d3', '#d4af37', '#e8c4c4'];
    const end = Date.now() + 4000;

    confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors,
        startVelocity: 32,
    });

    const timer = setInterval(() => {
        if (Date.now() > end) return clearInterval(timer);
        confetti({ particleCount: 2, angle: 60, spread: 50, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 2, angle: 120, spread: 50, origin: { x: 1, y: 0.6 }, colors });
    }, 90);
}

export default function CelebrationSection() {
    const fired = useRef(false);

    useEffect(() => {
        if (!fired.current) {
            fired.current = true;
            setTimeout(burstConfetti, 500);
        }
    }, []);

    return (
        <motion.section
            className="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
        >
            <FloatingHearts count={10} />

            <div className="cel-bg">
                <img src="/photos/tofunmi-1.jpg" alt="" className="cel-bg-img" />
                <div className="cel-bg-overlay" />
            </div>

            <div className="cel-body">
                <motion.span
                    className="cel-kicker"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Congratulations
                </motion.span>

                <motion.h1
                    className="cel-headline"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1, type: 'spring', stiffness: 120 }}
                >
                    She said yes.
                </motion.h1>

                {/* Date reveal card */}
                <motion.div
                    className="cel-date-card"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.9 }}
                >
                    <span className="cel-date-label">You have a date</span>
                    <div className="cel-date-line" />
                    <div className="cel-date-venue">
                        <span className="cel-venue-at">at</span>
                        <h2 className="cel-venue-name">Bricks Restaurant</h2>
                        <a
                            href="https://maps.google.com/maps?daddr=Brisk&dirflg=d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cel-venue-map-link"
                        >
                            View on Maps ↗
                        </a>
                    </div>
                    <div className="cel-date-line" />
                    <div className="cel-date-with">
                        <span className="cel-with-label">with</span>
                        <span className="cel-with-name">Mr. Remilekun Ayeola</span>
                    </div>
                    <p className="cel-date-note">
                        Time and date would be communicated
                    </p>
                </motion.div>

                {/* Personal closing */}
                <motion.div
                    className="cel-closing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                >
                    <p className="cel-closing-msg">
                        Thank you for saying yes. You won't regret it, Tofunmi.
                    </p>
                    <div className="cel-sig">
                        <span className="cel-sig-line" />
                        <span className="cel-sig-name">Remilekun</span>
                        <span className="cel-sig-line" />
                    </div>
                </motion.div>

                <motion.span
                    className="cel-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 3.5 }}
                >
                    Valentine's Day · 2026
                </motion.span>
            </div>
        </motion.section>
    );
}
