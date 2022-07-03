import Team from './team';

export interface Bet {
  value: number;
  target: Team['name'];
  created_at: EpochTimeStamp;
}

export type BetRequestBody = Omit<Bet, 'created_at'>;

export default interface Player {
  name: string;
  bet: Bet;
}

export interface PlayerRequestBody extends Omit<Player, 'bet'> {
  bet: BetRequestBody;
}
