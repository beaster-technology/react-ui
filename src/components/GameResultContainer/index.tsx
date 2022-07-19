import { Divider, ScrollArea } from '@mantine/core';
import React from 'react';
import useTeams from '../../hooks/useTeams';
import GameResult from '../../models/gameResult';

import styles from './GameResultContainer.module.css';

interface GameResultContainerProps {
  gameResult: GameResult;
  unit: string;
}

function GameResultContainer({ gameResult, unit }: GameResultContainerProps) {
  const allTeams = useTeams();

  return (
    <ScrollArea
      styles={{ scrollbar: { '&:hover': { backgroundColor: '#00000000' } } }}
      style={{ height: 'calc(100% - var(--game-details-footer-height) * 2)' }}
      className={styles.container}
    >
      <h3>
        <small>Vencedor</small>
        {allTeams[gameResult.champion]}
      </h3>

      <Divider size="sm" color="var(--brown)" />

      <ul className={styles.winnersList}>
        {gameResult.winners.map((player) => (
          <li key={player.name}>
            <span>{player.name}</span>{' '}
            <span>
              {player.bet.value} {unit}
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export default GameResultContainer;
