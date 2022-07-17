import React, { useState } from 'react';
import { Modal, Select } from '@mantine/core';

import styles from './NewGameModalProps.module.css';
import useTeams from '../../hooks/useTeams';

interface NewGameModalProps {
  opened: boolean;
  title: string;
  onClose: () => void;
}

function NewGameModal({ opened, title, onClose }: NewGameModalProps) {
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
      </div>
    </Modal>
  );
}

export default NewGameModal;
