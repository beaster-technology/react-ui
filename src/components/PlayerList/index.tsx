import React from 'react';
import { ScrollArea } from '@mantine/core';
import Player from '../../models/player';

import styles from './PlayerList.module.css';
import Team from '../../models/team';

interface PlayerListProps {
  players: Player[];
  teams: Team[];
  unit: string;
}

function PlayerList({ players, teams, unit }: PlayerListProps) {
  return (
    <ScrollArea
      styles={{ scrollbar: { '&:hover': { backgroundColor: '#00000000' } } }}
      style={{ height: 'calc(100% - var(--game-details-footer-height) * 2)' }}
      className={styles.playersContainer}
    >
      <div>
        <ul>
          {players
            .filter((player) => player.bet.target === teams[0].name)
            .map((player) => (
              <li key={player.name}>
                <span>{player.name}</span>{' '}
                <span>
                  {player.bet.value} {unit}
                </span>
              </li>
            ))}
        </ul>
        <ul>
          {players
            .filter((player) => player.bet.target === teams[1].name)
            .map((player) => (
              <li key={player.name}>
                <span>{player.name}</span>{' '}
                <span>
                  {player.bet.value} {unit}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </ScrollArea>
  );
}

export default PlayerList;
