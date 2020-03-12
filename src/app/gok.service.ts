import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GokService {
  private gokken = [];
  randomGetal: number = 0;

  constructor() {
    this.nieuwRandomGetal();
  }

  toevoegen = (gok) => {
    this.gokken.push(gok);
  }

  weergeven = () => this.gokken;

  legen = () => {
    this.gokken = [];
    return this.gokken;
  }

  nieuwRandomGetal = () => {
    this.randomGetal = Math.floor((Math.random() * 100) + 1);
  }
}
