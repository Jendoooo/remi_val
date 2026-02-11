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

    const fade = (delay) => ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay, duration: 0.9 },
    });

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
                    <span className="letter-to">Dear Olúwatófúnmi,</span>

                    {/* Photos of her in black */}
                    <div className="letter-photos">
                        <motion.div className="letter-photo-wrap" {...fade(0.5)}>
                            <img src="/photos/tofunmi-4.jpg" alt="" className="letter-photo" />
                        </motion.div>
                        <motion.div className="letter-photo-wrap" {...fade(0.8)}>
                            <img src="/photos/tofunmi-5.jpg" alt="" className="letter-photo" />
                        </motion.div>
                    </div>

                    <motion.p className="letter-text" {...fade(1.1)}>
                        We met barely a month ago, yet somehow it feels like I've known
                        you for much longer. From our conversations to the little moments
                        in between, you've brought a calm, joy, and excitement into my
                        life that I didn't even know I was missing.
                    </motion.p>

                    {/* Video moment */}
                    <motion.div className="letter-video-wrap" {...fade(1.6)}>
                        <video
                            className="letter-video"
                            src="/photos/remi-tofunmi-1.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="video-caption">us.</span>
                    </motion.div>

                    <motion.p className="letter-text" {...fade(2.0)}>
                        You make things feel easy. You make me smile without trying.
                        And every day, I find myself grateful that our paths crossed
                        when they did.
                    </motion.p>

                    <motion.p className="letter-text" {...fade(2.5)}>
                        When everything felt heavy, you held me down without even being
                        asked. You showed up — not with big words, but with your
                        presence, your calm, and your heart. I won't forget that.
                    </motion.p>

                    {/* Second photo row — glam shots */}
                    <motion.div className="letter-photos" {...fade(3.0)}>
                        <div className="letter-photo-wrap">
                            <img src="/photos/tofunmi-3.jpg" alt="" className="letter-photo" />
                        </div>
                        <div className="letter-photo-wrap">
                            <img src="/photos/tofunmi-2.jpg" alt="" className="letter-photo" />
                        </div>
                    </motion.div>

                    <motion.p className="letter-text" {...fade(3.4)}>
                        I wanted to do something a little extraordinary because you
                        deserve more than ordinary. You deserve effort, intention, and
                        love shown in ways that matter. This is my small way of saying
                        how special you are to me, and how much I value what we're
                        building.
                    </motion.p>

                    <motion.p className="letter-text letter-text--emphasis" {...fade(3.8)}>
                        So here I am, asking from a genuine place —
                    </motion.p>

                    {/* Name meaning — subtle */}
                    <motion.div className="name-meaning" {...fade(4.0)}>
                        <span className="name-meaning-yoruba">Olúwatófúnmi</span>
                        <span className="name-meaning-gloss">My God is sufficient for me</span>
                    </motion.div>
                </motion.div>

                {/* The question */}
                <motion.div
                    className="question-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="question-text">Will you be my Valentine?</h2>
                    <span className="question-sig">— Olúwarẹ̀mílẹ́kún</span>
                    <span className="question-sig-meaning">God consoled me</span>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="answer-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.2 }}
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
