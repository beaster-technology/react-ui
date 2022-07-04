import { ScrollArea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../../models/game';
import GameService from '../../services/gameService';

import styles from './GameDetails.module.css';

function GameDetails() {
  const params = useParams();

  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (params.gameId)
      GameService.getGameById(params.gameId).then((fetchedGame) => setGame(fetchedGame));
  }, []);

  return (
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
                  <span>{player.name}</span> <span>{player.bet.value} Beastcoins</span>
                </li>
              ))}
          </ul>
          <ul>
            {game?.players
              .filter((player) => player.bet.target === game.teams[1].name)
              .map((player) => (
                <li key={player.name}>
                  <span>{player.name}</span> <span>{player.bet.value} Beastcoins</span>
                </li>
              ))}
          </ul>
        </div>
      </ScrollArea>

      <footer>
        <label htmlFor="unit">
          Unidade:
          <input type="text" id="unit" placeholder="Beastcoins" />
        </label>

        <button type="button">Novo Apostador</button>
      </footer>
    </section>
  );
}

export default GameDetails;
