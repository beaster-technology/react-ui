import Player, { PlayerRequestBody } from './player';
import Team, { TeamRequestBody } from './team';

export default interface Game {
  id: string;
  open_at: EpochTimeStamp;

  teams: [Team];
  players: [Player];

  unit: string;
  is_open: boolean;
}

export interface GameRequestBody
  extends Omit<Game, 'teams' | 'players' | 'id' | 'open_at' | 'is_open'> {
  teams: [TeamRequestBody];
  players: [PlayerRequestBody];
  open_at?: EpochTimeStamp;
}
