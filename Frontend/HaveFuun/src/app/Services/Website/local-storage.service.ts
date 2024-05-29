import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, token)
  }

  getLocalStorage(key: string): string {
    let value: string | null = localStorage.getItem(key)
    return value ? value : ""
  }
  clearLocalStorage(): void {
    localStorage.clear()
  }
}
