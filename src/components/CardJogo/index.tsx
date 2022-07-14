import React from 'react';
import { Link } from 'react-router-dom';
import Game from '../../models/game';
import styles from './CardJogo.module.css';
import logo from './logo.jpg';

type CardJogoProps = {
  jogo: Game;
};

function CardJogo({ jogo }: CardJogoProps) {
  const [time1, time2] = jogo.teams;
  const tempo = new Date(jogo.open_at * 1000);

  return (
    <div className={styles.CardJogo}>
      <div className={styles.placar}>
        <div className={styles.time}>
          <img src={logo} alt={time1.name} className="logoTime" />
          <p>{time1.name}</p>
        </div>
        <div className={styles.infosJogo}>
          <div className={styles.pontuacao}>
            <span>{time1.goals == null ? '?' : time1.goals}</span>
            <span>x</span>
            <span>{time2.goals == null ? '?' : time2.goals}</span>
          </div>
          <p>{tempo.toLocaleDateString()}</p>
          <p>{tempo.toLocaleTimeString()}</p>
        </div>
        <div className={styles.time}>
          <img src={logo} alt={time2.name} className="logoTime" />
          <p>{time2.name}</p>
        </div>
      </div>
      <div className={styles.detalhes}>
        <span>Mais detalhes</span>
      </div>
    </div>
  );
}

export default CardJogo;
