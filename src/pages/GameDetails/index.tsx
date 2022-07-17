import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import Game from '../../models/game';
import GameService from '../../services/gameService';

import styles from './GameDetails.module.css';
import AnimatedNotification from '../../components/AnimatedNotification';
import GameDefinitionModal from '../../components/GameDefinitionModal';
import AddPlayerModal from '../../components/AddPlayerModal';
import GameResult from '../../models/gameResult';
import PlayerList from '../../components/PlayerList';
import GameResultContainer from '../../components/GameResultContainer';

function GameDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>();
  const [gameResult, setGameResult] = useState<GameResult>();
  const [shouldShowGameSavedNotification, setShouldShowGameSavedNotification] = useState(false);
  const [openGameDefinitionModal, setOpenGameDefinitionModal] = useState(false);
  const [openAddPlayerModal, setOpenAddPlayerModal] = useState(false);

  const gameRef = useRef<Game>();

  const timeoutToUpdate = useRef<number | undefined>(undefined);

  const showGameSavedNotification = (timeout = 0) => {
    // show notification
    setShouldShowGameSavedNotification(true);

    // hide notification after timeout
    if (timeout) setTimeout(() => setShouldShowGameSavedNotification(false), timeout);
  };

  const updateGame = async () => {
    if (params.gameId && game) {
      if (game.is_open) {
        await GameService.updateGame(params.gameId, game);
        showGameSavedNotification(1000 * 3);
      }
    }
  };

  const closeGame = async () => {
    if (params.gameId && game && !gameResult) {
      const result = await GameService.closeGame(params.gameId);

      if (result) setGameResult(result);
    }
  };

  useEffect(() => {
    if (params.gameId && !game) {
      GameService.getGameById(params.gameId).then((fetchedGame) => {
        if (fetchedGame) setGame(fetchedGame);
        else navigate('/');
      });
    }
  }, []);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = game;
      return;
    }

    if (game?.is_open) {
      if (timeoutToUpdate.current) window.clearTimeout(timeoutToUpdate.current);
      timeoutToUpdate.current = window.setTimeout(updateGame, 1000 * 1);
    } else {
      closeGame();
    }
  }, [game]);

  return !game ? (
    <Loader
      color="var(--salmon)"
      size="xl"
      style={{ position: 'absolute', top: '44%', left: '48%' }}
    />
  ) : (
    <>
      <GameDefinitionModal
        opened={openGameDefinitionModal}
        title="Definição de resultado!"
        teams={game.teams}
        onClose={() => setOpenGameDefinitionModal(false)}
        onGameDefinition={(teamOneGoals, teamTwoGoals) => {
          setOpenGameDefinitionModal(false);

          setGame((prevGame) => {
            const updatedGame = { ...prevGame! };

            updatedGame.is_open = false;

            updatedGame.teams[0].goals = teamOneGoals;
            updatedGame.teams[1].goals = teamTwoGoals;

            return updatedGame;
          });
        }}
      />

      <AddPlayerModal
        title="Novo apostador"
        opened={openAddPlayerModal}
        teams={game.teams}
        unit={game.unit}
        onClose={() => setOpenAddPlayerModal(false)}
        onPlayerAddition={(newPlayer) => {
          setOpenAddPlayerModal(false);

          setGame((prevGame) => {
            const updatedGame = { ...prevGame! };

            updatedGame.players.push(newPlayer);

            return updatedGame;
          });
        }}
      />

      <section className={styles.gameDetails}>
        <header>
          <span>{game?.teams[0].name}</span>
          <div className={styles.gameDefinition}>
            {game.is_open ? (
              <button type="button" onClick={() => setOpenGameDefinitionModal(true)}>
                Definir Resultado
              </button>
            ) : (
              <>
                <div className={styles.box}>
                  <span>{game.teams[0].goals}</span>
                </div>

                <div className={styles.box}>X</div>

                <div className={styles.box}>
                  <span>{game.teams[1].goals}</span>
                </div>
              </>
            )}
          </div>
          <span>{game?.teams[1].name}</span>
        </header>

        {!gameResult ? (
          <PlayerList players={game.players} teams={game.teams} unit={game.unit} />
        ) : (
          <GameResultContainer gameResult={gameResult} unit={game.unit} />
        )}

        <footer>
          <label htmlFor="unit">
            Unidade:
            <input
              type="text"
              id="unit"
              placeholder="Beastcoins"
              maxLength={12}
              value={game?.unit === 'Beastcoins' ? '' : game?.unit}
              onChange={(e) =>
                setGame((previousGame) => ({
                  ...previousGame!,
                  unit: e.target.value || 'Beastcoins',
                }))
              }
            />
          </label>

          <button type="button" onClick={() => setOpenAddPlayerModal(true)}>
            Novo Apostador
          </button>
        </footer>
      </section>

      <AnimatedNotification
        show={shouldShowGameSavedNotification}
        onClose={() => setShouldShowGameSavedNotification(false)}
      >
        Jogo salvo!
      </AnimatedNotification>
    </>
  );
}

export default GameDetails;
