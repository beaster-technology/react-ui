import Team from './team';

export interface Bet {
  value: number;
  target: Team['name'];
  created_at: EpochTimeStamp;
}

export default interface Player {
  name: string;
  bet: Bet;
}
