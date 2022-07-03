import Player, { PLayerCreationBody } from './player';
import Team, { TeamCreationBody } from './team';

export default interface Game {
  id: string;
  open_at: EpochTimeStamp;

  teams: [Team];
  players: [Player];

  unit: string;
  is_open: boolean;
}

export interface GameCreationBody
  extends Omit<Game, 'teams' | 'players' | 'id' | 'open_at' | 'is_open'> {
  teams: [TeamCreationBody];
  players: [PLayerCreationBody];
  open_at?: EpochTimeStamp;
}
