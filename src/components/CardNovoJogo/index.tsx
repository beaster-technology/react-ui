import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardNovoJogo.module.css';

function CardNovoJogo() {
  return (
    <div className={styles.CardNovoJogo}>
      <p>+</p>
      <p>Novo Jogo</p>
    </div>
  );
}

export default CardNovoJogo;
