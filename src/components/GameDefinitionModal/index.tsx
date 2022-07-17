import React, { useState } from 'react';
import { Modal } from '@mantine/core';

import styles from './GameDefinitionModal.module.css';
import Team from '../../models/team';

interface GameDefinitionModalProps {
  opened: boolean;
  title: string;
  teams: Team[];
  onClose: () => void;
  onGameDefinition: (teamOneGoals: number, teamTwoGoals: number) => void;
}

function GameDefinitionModal({
  opened,
  title,
  teams,
  onClose,
  onGameDefinition,
}: GameDefinitionModalProps) {
  const [teamOneGoals, setTeamOneGoals] = useState('');
  const [teamTwoGoals, setTeamTwoGoals] = useState('');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      classNames={{ modal: styles.modal, close: styles.close, title: styles.title }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.teams}>
          <label htmlFor="first-team">
            {teams[0].name}
            <input
              id="first-team"
              maxLength={4}
              value={teamOneGoals}
              onChange={(e) =>
                setTeamOneGoals((prev) =>
                  Number.isInteger(Number(e.target.value)) ? e.target.value : prev
                )
              }
            />
          </label>

          <span>X</span>

          <label htmlFor="second-team">
            <input
              id="second-team"
              maxLength={4}
              value={teamTwoGoals}
              onChange={(e) =>
                setTeamTwoGoals((prev) =>
                  Number.isInteger(Number(e.target.value)) ? e.target.value : prev
                )
              }
            />
            {teams[1].name}
          </label>
        </div>

        <button
          type="button"
          disabled={!teamOneGoals || !teamTwoGoals}
          onClick={() => onGameDefinition(parseInt(teamOneGoals, 10), parseInt(teamTwoGoals, 10))}
        >
          Definir resultado
        </button>
      </div>
    </Modal>
  );
}

export default GameDefinitionModal;
