import { Modal, NumberInput, Select, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import Team from '../../models/team';
import Player from '../../models/player';

import styles from './AddPlayerModal.module.css';

interface AddPlayerModalProps {
  opened: boolean;
  title: string;
  teams: Team[];
  unit: string;
  onClose: () => void;
  onPlayerAddition: (newPlayer: Player) => void;
}

function AddPlayerModal({
  opened,
  title,
  teams,
  unit,
  onClose,
  onPlayerAddition,
}: AddPlayerModalProps) {
  const emptyPlayer: Player = { name: '', bet: { value: 1, target: '' } };

  const [newPlayer, setNewPlayer] = useState<Player>(emptyPlayer);

  return (
    <Modal
      opened={opened}
      title={title}
      onClose={onClose}
      classNames={{ modal: styles.modal, close: styles.close, title: styles.title }}
    >
      <div className={styles.contentWrapper}>
        <TextInput
          label="Nome do jogador"
          radius="md"
          className={styles.inputElements}
          value={newPlayer.name}
          onChange={(e) => setNewPlayer((prev) => ({ ...prev, name: e.target.value }))}
        />

        <NumberInput
          label="Aposta do jogador"
          radius="md"
          className={styles.inputElements}
          classNames={{ rightSection: styles.unitInputRightSection }}
          value={newPlayer.bet.value}
          rightSection={<span>{unit}</span>}
          hideControls
          maxLength={4}
          min={0}
          onChange={(e) => {
            setNewPlayer((prev) => ({
              ...prev,
              bet: {
                ...prev.bet,
                value: e ?? NaN,
              },
            }));
          }}
        />

        <Select
          label="Time"
          data={teams.map((team) => team.name)}
          searchable
          nothingFound="Nenhum time encontrado"
          radius="md"
          className={styles.inputElements}
          value={newPlayer.bet.target}
          onChange={(team) =>
            setNewPlayer((prev) => ({ ...prev, bet: { ...prev.bet, target: team ?? '' } }))
          }
        />

        <button
          type="button"
          onClick={() => {
            //  reset player state
            setNewPlayer(emptyPlayer);

            onPlayerAddition(newPlayer);
          }}
          disabled={
            [newPlayer.name, newPlayer.bet.target].some((str) => !str) ||
            Number.isNaN(newPlayer.bet.value)
          }
        >
          Adicionar apostador
        </button>
      </div>
    </Modal>
  );
}

export default AddPlayerModal;
