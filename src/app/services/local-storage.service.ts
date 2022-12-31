import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  JWT_TOKEN_KEY = 'JWT_TOKEN';

  constructor() {}

  public setJwt(token: string) {
    localStorage.setItem(this.JWT_TOKEN_KEY, JSON.stringify(token));
  }

  public getJwt(): string | null {
    const jwt = localStorage.getItem(this.JWT_TOKEN_KEY);
    if (jwt) {
      return JSON.parse(jwt);
    }
    return null;
  }
}
