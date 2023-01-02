import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  JWT_TOKEN_KEY = 'JWT_TOKEN';

  public setJwt(token: string) {
    localStorage.setItem(this.JWT_TOKEN_KEY, token);
  }

  public getJwt(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }
}
