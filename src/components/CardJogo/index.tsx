import React from 'react';
import { Link } from 'react-router-dom';
import useTeams from '../../hooks/useTeams';
import Game from '../../models/game';
import styles from './CardJogo.module.css';

type CardJogoProps = {
  jogo: Game;
};

function CardJogo({ jogo }: CardJogoProps) {
  const allTeams = useTeams();

  const [time1, time2] = jogo.teams;

  return (
    <div className={styles.CardJogo}>
      <div className={styles.placar}>
        <div className={styles.time}>
          <img
            src={`https://countryflagsapi.com/png/${time1.name}`}
            alt={time1.name}
            className="logoTime"
          />
          <p>{allTeams[time1.name]}</p>
        </div>
        <div className={styles.infosJogo}>
          <div className={styles.pontuacao}>
            <span>{time1.goals == null ? '?' : time1.goals}</span>
            <span>x</span>
            <span>{time2.goals == null ? '?' : time2.goals}</span>
          </div>
        </div>
        <div className={styles.time}>
          <img
            src={`https://countryflagsapi.com/png/${time2.name}`}
            alt={allTeams[time2.name]}
            className="logoTime"
          />
          <p>{allTeams[time2.name]}</p>
        </div>
      </div>
      <Link to={jogo.id}>
        <div className={styles.detalhes}>
          <span>Mais detalhes</span>
        </div>
      </Link>
    </div>
  );
}

export default CardJogo;
