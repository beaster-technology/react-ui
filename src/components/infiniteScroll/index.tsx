import React from 'react';
import CardJogo from '../CardJogo';
import CardNovoJogo from '../CardNovoJogo';
import styles from './InfiniteScroll.module.css';
import Game, { GameRequestBody } from '../../models/game';
import GameService from '../../services/gameService';

function InfiniteScroll() {
  const [games, setGames] = React.useState<Game[] | null>([]);

  React.useEffect(() => {
    async function buscaJogos() {
      const response = await GameService.getGame();
      setGames(await response);
    }
    buscaJogos();
  }, []);

  return (
    <div className={styles.infiniteS}>
      <CardNovoJogo />
      {games?.map((card) => (
        <CardJogo jogo={card} />
      ))}
    </div>
  );
}

export default InfiniteScroll;
