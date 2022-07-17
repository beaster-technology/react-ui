import React, { ReactNode } from 'react';

import { Notification } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './AnimatedNotification.module.css';

interface AnimatedNotificationProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

function AnimatedNotification({ show, onClose, children }: AnimatedNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ right: '-30%' }}
          animate={{ right: '1%' }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 500, damping: 30 }}
          exit={{ right: '-30%' }}
          className={styles.animationWrapper}
        >
          <Notification className={styles.savedNotification} color="teal" onClose={onClose}>
            {children}
          </Notification>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedNotification;
