import { Loader, Notification, ScrollArea } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Game from '../../models/game';
import GameService from '../../services/gameService';

import styles from './GameDetails.module.css';

function GameDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>();
  const [shouldShowGameSavedNotification, setShouldShowGameSavedNotification] = useState(false);

  const gameRef = useRef<Game>();
  gameRef.current = game;
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
      showGameSavedNotification(1000 * 4);
    }
  };

  useEffect(() => {
    if (params.gameId)
      GameService.getGameById(params.gameId).then((fetchedGame) => {
        if (fetchedGame) setGame(fetchedGame);
        else navigate('/');
      });
  }, []);

  return !game ? (
    <Loader
      color="var(--salmon)"
      size="xl"
      style={{ position: 'absolute', top: '44%', left: '48%' }}
    />
  ) : (
    <>
      <section className={styles.gameDetails}>
        <header>
          <span>{game?.teams[0].name}</span>
          <button type="button">Definir Resultado</button>
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
              onChange={(e) => {
                console.log(e.target.value, game.unit);

                setGame((previousGame) => ({
                  ...previousGame!,
                  unit: e.target.value || 'Beastcoins',
                }));

                if (timeoutToUpdate.current) window.clearTimeout(timeoutToUpdate.current);
                timeoutToUpdate.current = window.setTimeout(updateGame, 1000 * 3);
              }}
            />
          </label>

          <button type="button">Novo Apostador</button>
        </footer>
      </section>

      {shouldShowGameSavedNotification && (
        <Notification
          className={styles.savedNotification}
          color="teal"
          onClose={() => setShouldShowGameSavedNotification(false)}
        >
          Alterações salvas
        </Notification>
      )}
    </>
  );
}

export default GameDetails;
