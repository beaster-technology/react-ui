export default interface Team {
  name: string;
  goals: number;
}

export type TeamCreationBody = Omit<Team, 'goals'>;
