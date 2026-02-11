import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from './FloatingHearts';
import './CelebrationSection.css';

function burstConfetti() {
    const colors = ['#c9a96e', '#d4a0a0', '#722f37', '#f5e6d3', '#d4af37', '#e8c4c4'];
    const end = Date.now() + 3500;

    confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.55 },
        colors,
        startVelocity: 30,
    });

    const timer = setInterval(() => {
        if (Date.now() > end) return clearInterval(timer);
        confetti({ particleCount: 2, angle: 60, spread: 50, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 2, angle: 120, spread: 50, origin: { x: 1, y: 0.6 }, colors });
    }, 100);
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

            {/* Background hero photo */}
            <div className="cel-bg">
                <img src="/photos/tofunmi-1.jpg" alt="" className="cel-bg-img" />
                <div className="cel-bg-overlay" />
            </div>

            <div className="cel-body">
                <motion.h1
                    className="cel-headline"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 120 }}
                >
                    She said yes.
                </motion.h1>

                <motion.div
                    className="cel-card"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.9 }}
                >
                    <p className="cel-msg">
                        This Valentine's Day is ours, Tofunmi.
                        I can't wait to make it one to remember.
                    </p>
                    <p className="cel-msg cel-msg--small">
                        Thank you for saying yes. You won't regret it.
                    </p>
                    <div className="cel-sig">
                        <span className="cel-sig-line" />
                        <span className="cel-sig-name">Remilekun</span>
                        <span className="cel-sig-line" />
                    </div>
                </motion.div>

                <motion.span
                    className="cel-date"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2 }}
                >
                    Valentine's Day · 2026
                </motion.span>
            </div>
        </motion.section>
    );
}
