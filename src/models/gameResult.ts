import Player from './player';
import Team from './team';

export default interface GameResult {
  id: string;
  winners: Player[];
  champion: Team['name'];
}
