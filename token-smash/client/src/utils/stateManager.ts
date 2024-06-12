// This module provides methods for managing game, player & opponent state
// across the client

export default class StateManager {
  private currentGameState: object | null;
  private currentUserData: object | null;

  constructor() {
    this.currentGameState = null;
    this.currentUserData = null;
  }

  updateGameState(newState: object): void {
    this.currentGameState = newState;
  }

  updateUserData(newData: object): void {
    this.currentUserData = newData;
  }

  getGameState(): object | null {
    return this.currentGameState;
  }

  getUserData(): object | null {
    return this.currentUserData;
  }
}
