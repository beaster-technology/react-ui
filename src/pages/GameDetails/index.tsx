import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../../models/game';
import GameService from '../../services/gameService';

function GameDetails() {
  const params = useParams();

  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (params.gameId)
      GameService.getGameById(params.gameId).then((fetchedGame) => setGame(fetchedGame));
  }, []);

  return (
    <section>
      <header>
        Vasco
        <button type="button">Definir Resultado</button>
        Atlético P.
      </header>
      {game?.players.map((player) => (
        <p>
          {player.name} | {player.bet.target} • {player.bet.value} Beastcoins
        </p>
      ))}
      <footer>
        <label htmlFor="unit">
          Unidade:
          <input type="text" id="unit" />
        </label>

        <button type="button">Novo Apostador</button>
      </footer>
    </section>
  );
}

export default GameDetails;
