import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
    },
    in: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    out: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full w-full overflow-y-auto no-scrollbar"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
