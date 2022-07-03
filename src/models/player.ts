import Team from './team';

export interface Bet {
  value: number;
  target: Team['name'];
  created_at: EpochTimeStamp;
}

export type BetCreationBody = Omit<Bet, 'created_at'>;

export default interface Player {
  name: string;
  bet: Bet;
}

export interface PLayerCreationBody extends Omit<Player, 'bet'> {
  bet: BetCreationBody;
}
