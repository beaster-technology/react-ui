import { AxiosError } from 'axios';
import Game, { GameRequestBody } from '../models/game';
import GameResult from '../models/gameResult';
import axiosClient from './apiClient';

class GameService {
  static async getGame(): Promise<[Game] | null> {
    try {
      const { data } = await axiosClient.get<[Game]>('/game');

      return data;
    } catch (error) {
      this.handleAxiosError(error);

      return null;
    }
  }

  static async getGameById(id: string): Promise<Game | null> {
    try {
      const { data } = await axiosClient.get<Game>(`/game/${id}`);

      return data;
    } catch (error) {
      this.handleAxiosError(error);

      return null;
    }
  }

  static async getGameResult(id: string): Promise<GameResult | null> {
    try {
      const { data } = await axiosClient.get<GameResult>(`/game/${id}/result`);

      return data;
    } catch (error) {
      this.handleAxiosError(error);

      return null;
    }
  }

  static async createGame(game: GameRequestBody): Promise<Game | null> {
    try {
      const { data } = await axiosClient.post<Game>('/game', game);

      return data;
    } catch (error) {
      this.handleAxiosError(error);

      return null;
    }
  }

  static async closeGame(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/game/${id}/close`);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async updateGame(id: string, game: GameRequestBody): Promise<Game | null> {
    try {
      const { data } = await axiosClient.put<Game>(`/game/${id}`, game);

      return data;
    } catch (error) {
      this.handleAxiosError(error);

      return null;
    }
  }

  static async deleteGame(id: string): Promise<void> {
    try {
      await axiosClient.delete(`game/${id}`);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  private static handleAxiosError(error: unknown) {
    if (error instanceof AxiosError) {
      console.log(`${error.code} : ${error.cause}`);
    } else {
      console.log(`An unexpected error occured: ${error}`);
    }
  }
}

export default GameService;
