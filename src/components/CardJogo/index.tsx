import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardJogo.module.css';
import logo from './logo.jpg';

function CardJogo() {
  return (
    <div className={styles.CardJogo}>
      <div className={styles.placar}>
        <div className={styles.time}>
          <img src={logo} alt="{1+2}" className="logoTime" />
          <p>Vasco pra caralho</p>
        </div>
        <div className={styles.infosJogo}>
          <div className={styles.pontuacao}>
            <span>?</span>
            <span>x</span>
            <span>?</span>
          </div>
          <p>05/07/2022</p>
          <p>14:35</p>
        </div>
        <div className={styles.time}>
          <img src={logo} alt="{1+2}" className="logoTime" />
          <p>Vasco</p>
        </div>
      </div>
      <div className={styles.detalhes}>
        <span>Mais detalhes</span>
      </div>
    </div>
  );
}

export default CardJogo;
