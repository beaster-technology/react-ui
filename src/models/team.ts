export default interface Team {
  name: string;
  goals?: number;
}

export type TeamRequestBody = Omit<Team, 'goals'>;
