import React, { useState } from 'react';
import { Modal, Select } from '@mantine/core';

import styles from './NewGameModalProps.module.css';
import useTeams from '../../hooks/useTeams';
import { GameRequestBody } from '../../models/game';

interface NewGameModalProps {
  opened: boolean;
  title: string;
  onClose: () => void;
  onGameCreation: (game: GameRequestBody) => void;
}

function NewGameModal({ opened, title, onClose, onGameCreation }: NewGameModalProps) {
  const teams = useTeams();

  const [team1, setTeam1] = useState<string | null>(null);
  const [team2, setTeam2] = useState<string | null>(null);

  return (
    <Modal
      opened={opened}
      title={title}
      onClose={onClose}
      classNames={{ modal: styles.modal, close: styles.close, title: styles.title }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.teams}>
          <Select
            label="Time 1"
            data={Object.entries(teams)
              .map(([code, name]) => ({
                value: code,
                label: name,
              }))
              .filter(({ value }) => value !== team2)}
            searchable
            nothingFound="Nenhum time encontrado"
            radius="md"
            className={styles.inputElements}
            value={team1}
            onChange={(team) => setTeam1(team)}
          />

          <span>X</span>

          <Select
            label="Time 2"
            data={Object.entries(teams)
              .map(([code, name]) => ({
                value: code,
                label: name,
              }))
              .filter(({ value }) => value !== team1)}
            searchable
            nothingFound="Nenhum time encontrado"
            radius="md"
            className={styles.inputElements}
            value={team2}
            onChange={(team) => setTeam2(team)}
          />
        </div>

        <button
          type="button"
          disabled={!team1 || !team2}
          onClick={() => {
            const game: GameRequestBody = {
              teams: [{ name: team1! }, { name: team2! }],
              players: [],
              unit: 'Beastcoins',
            };

            onGameCreation(game);
          }}
        >
          Criar jogo
        </button>
      </div>
    </Modal>
  );
}

export default NewGameModal;
