import React from 'react';
import CardJogo from '../CardJogo';
import styles from './InfiniteScroll.module.css';

function InfiniteScroll() {
  return (
    <div className={styles.infiniteS}>
      <CardJogo />
      <CardJogo />
      <CardJogo />
      <CardJogo />
    </div>
  );
}

export default InfiniteScroll;
