import React, { useEffect, useRef, useState } from 'react';
import { Loader, ScrollArea } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import Game from '../../models/game';
import GameService from '../../services/gameService';

import styles from './GameDetails.module.css';
import AnimatedNotification from '../../components/AnimatedNotification';
import GameDefinitionModal from '../../components/GameDefinitionModal';

function GameDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>();
  const [shouldShowGameSavedNotification, setShouldShowGameSavedNotification] = useState(false);
  const [openGameDefinitionModal, setOpenGameDefinitionModal] = useState(false);

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
      await GameService.updateGame(params.gameId, game);
      showGameSavedNotification(1000 * 3);
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

    if (timeoutToUpdate.current) window.clearTimeout(timeoutToUpdate.current);
    timeoutToUpdate.current = window.setTimeout(updateGame, 1000 * 1.5);
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

        <ScrollArea
          styles={{ scrollbar: { '&:hover': { backgroundColor: '#00000000' } } }}
          style={{ height: 'calc(100% - var(--game-details-footer-height) * 2)' }}
          className={styles.playersContainer}
        >
          <div>
            <ul>
              {game?.players
                .filter((player) => player.bet.target === game.teams[0].name)
                .map((player) => (
                  <li key={player.name}>
                    <span>{player.name}</span>{' '}
                    <span>
                      {player.bet.value} {game.unit}
                    </span>
                  </li>
                ))}
            </ul>
            <ul>
              {game?.players
                .filter((player) => player.bet.target === game.teams[1].name)
                .map((player) => (
                  <li key={player.name}>
                    <span>{player.name}</span>{' '}
                    <span>
                      {player.bet.value} {game.unit}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </ScrollArea>

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

          <button type="button">Novo Apostador</button>
        </footer>
      </section>

      <AnimatedNotification
        show={shouldShowGameSavedNotification}
        onClose={() => setShouldShowGameSavedNotification(false)}
      >
        Alterações salvas
      </AnimatedNotification>
    </>
  );
}

export default GameDetails;
