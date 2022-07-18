import React from 'react';
import styles from './CardNovoJogo.module.css';

interface CardNovoJogoProps {
  onClick: () => void;
}

function CardNovoJogo({ onClick }: CardNovoJogoProps) {
  return (
    <button type="button" onClick={onClick} className={styles.wrapperButton}>
      <div className={styles.CardNovoJogo}>
        <p>+</p>
        <p>Novo Jogo</p>
      </div>
    </button>
  );
}

export default CardNovoJogo;
