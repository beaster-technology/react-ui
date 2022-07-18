import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardJogo from '../CardJogo';
import CardNovoJogo from '../CardNovoJogo';
import styles from './InfiniteScroll.module.css';
import Game, { GameRequestBody } from '../../models/game';
import GameService from '../../services/gameService';
import NewGameModal from '../NewGameModal';

function InfiniteScroll() {
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[] | null>([]);
  const [showNewGameModal, setShowNewGameModal] = useState(false);

  const createGame = async (game: GameRequestBody) => {
    const createdGame = await GameService.createGame(game);

    navigate(`/${createdGame?.id}`);
  };

  React.useEffect(() => {
    async function buscaJogos() {
      const response = await GameService.getGames();
      setGames(response);
    }
    buscaJogos();
  }, []);

  return (
    <>
      <NewGameModal
        title="Novo Jogo"
        opened={showNewGameModal}
        onClose={() => setShowNewGameModal(false)}
        onGameCreation={(game) => createGame(game)}
      />

      <div className={styles.infiniteS}>
        <CardNovoJogo onClick={() => setShowNewGameModal(true)} />
        {games?.map((card) => (
          <CardJogo jogo={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

export default InfiniteScroll;
