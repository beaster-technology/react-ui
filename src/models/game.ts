import Player from './player';
import Team from './team';

export default interface Game {
  id: string;
  open_at: EpochTimeStamp;

  teams: [Team];
  players: [Player];

  unit: string;
  is_open: boolean;
}
