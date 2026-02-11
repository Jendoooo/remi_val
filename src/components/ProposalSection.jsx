import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import './ProposalSection.css';

const NO_REACTIONS = [
    "No",
    "Are you sure?",
    "Really really sure?",
    "Okay think about it…",
    "Fine, I'll wait…",
    "…you sure though?",
    "Just say yes already",
];

export default function ProposalSection({ onYes }) {
    const [noCount, setNoCount] = useState(0);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [yesGrow, setYesGrow] = useState(1);

    const dodgeNo = useCallback(() => {
        if (noCount >= NO_REACTIONS.length - 1) {
            onYes();
            return;
        }
        const x = (Math.random() - 0.5) * 180;
        const y = (Math.random() - 0.5) * 100;
        setNoPos({ x, y });
        setNoCount((c) => c + 1);
        setYesGrow((g) => Math.min(g + 0.1, 1.5));
    }, [noCount, onYes]);

    const handleNoTouch = useCallback(
        (e) => { e.preventDefault(); dodgeNo(); },
        [dodgeNo]
    );

    return (
        <motion.section
            className="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
        >
            <FloatingHearts count={5} />

            <div className="proposal-body">
                {/* The letter */}
                <motion.div
                    className="letter"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="letter-to">Dear Tofunmi,</span>

                    <div className="letter-photos">
                        <motion.div
                            className="letter-photo-wrap"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <img src="/photos/tofunmi-2.jpg" alt="You" className="letter-photo" />
                        </motion.div>
                        <motion.div
                            className="letter-photo-wrap photo-overlap"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            <img src="/photos/tofunmi-3.jpg" alt="You" className="letter-photo" />
                        </motion.div>
                    </div>

                    <motion.p
                        className="letter-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        I don't really have all the perfect words,
                        but I know how I feel when I'm around you — and honestly,
                        that's more than enough for me.
                    </motion.p>

                    <motion.p
                        className="letter-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        You make ordinary moments feel special. Your laugh,
                        the way you look at me, your energy — it's everything.
                    </motion.p>

                    <motion.p
                        className="letter-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.4, duration: 0.8 }}
                    >
                        So I'm not going to overcomplicate this…
                    </motion.p>
                </motion.div>

                {/* The question */}
                <motion.div
                    className="question-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="question-text">Will You Be My Valentine?</h2>
                    <span className="question-sig">— Remilekun</span>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="answer-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.9 }}
                >
                    <motion.button
                        className="btn-yes"
                        onClick={onYes}
                        animate={{ scale: yesGrow }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        whileTap={{ scale: yesGrow * 0.95 }}
                    >
                        Yes
                    </motion.button>

                    <motion.button
                        className={`btn-no ${noCount > 3 ? 'btn-no--fading' : ''}`}
                        onClick={handleNoTouch}
                        onMouseEnter={noCount >= 3 ? dodgeNo : undefined}
                        onTouchStart={handleNoTouch}
                        animate={{
                            x: noPos.x,
                            y: noPos.y,
                            scale: Math.max(1 - noCount * 0.08, 0.55),
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                        {NO_REACTIONS[Math.min(noCount, NO_REACTIONS.length - 1)]}
                    </motion.button>
                </motion.div>

                {noCount >= 3 && (
                    <motion.p
                        className="nudge"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                    >
                        come on, you know the answer
                    </motion.p>
                )}
            </div>
        </motion.section>
    );
}
