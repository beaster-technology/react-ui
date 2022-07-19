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
  const allTeams = useTeams();

  const [teamCode1, setTeamCode1] = useState<string | null>(null);
  const [teamCode2, setTeamCode2] = useState<string | null>(null);

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
            data={Object.entries(allTeams)
              .map(([code, name]) => ({
                value: code,
                label: name,
              }))
              .filter(({ value }) => value !== teamCode2)}
            searchable
            nothingFound="Nenhum time encontrado"
            radius="md"
            className={styles.inputElements}
            value={teamCode1}
            onChange={(team) => setTeamCode1(team)}
          />

          <span>X</span>

          <Select
            label="Time 2"
            data={Object.entries(allTeams)
              .map(([code, name]) => ({
                value: code,
                label: name,
              }))
              .filter(({ value }) => value !== teamCode1)}
            searchable
            nothingFound="Nenhum time encontrado"
            radius="md"
            className={styles.inputElements}
            value={teamCode2}
            onChange={(team) => setTeamCode2(team)}
          />
        </div>

        <button
          type="button"
          disabled={!teamCode1 || !teamCode2}
          onClick={() => {
            const game: GameRequestBody = {
              teams: [{ name: teamCode1! }, { name: teamCode2! }],
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
