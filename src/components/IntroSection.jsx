import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import './IntroSection.css';

export default function IntroSection({ onContinue }) {
    const [showName, setShowName] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowName(true), 1200);
        const t2 = setTimeout(() => setShowBtn(true), 2800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <motion.section
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
        >
            <FloatingHearts count={6} />

            {/* Background photo with overlay */}
            <div className="intro-bg">
                <img
                    src="/photos/tofunmi-1.jpg"
                    alt=""
                    className="intro-bg-img"
                />
                <div className="intro-bg-overlay" />
            </div>

            <div className="intro-body">
                <motion.span
                    className="intro-kicker"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    February 14, 2026
                </motion.span>

                <motion.h1
                    className="intro-greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showName ? 1 : 0, y: showName ? 0 : 20 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    For You, Tofunmi
                </motion.h1>

                <motion.p
                    className="intro-line"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showName ? 1 : 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    I wrote you something. Will you read it?
                </motion.p>

                {showBtn && (
                    <motion.button
                        className="intro-btn"
                        onClick={onContinue}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Open my letter
                    </motion.button>
                )}
            </div>
        </motion.section>
    );
}
