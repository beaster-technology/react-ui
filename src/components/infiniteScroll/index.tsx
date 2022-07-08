import React from 'react';
import CardJogo from '../CardJogo';
import CardNovoJogo from '../CardNovoJogo';
import styles from './InfiniteScroll.module.css';

function InfiniteScroll() {
  return (
    <div className={styles.infiniteS}>
      <CardNovoJogo />
      <CardJogo />
      <CardJogo />
      <CardJogo />
      <CardJogo />
    </div>
  );
}

export default InfiniteScroll;
