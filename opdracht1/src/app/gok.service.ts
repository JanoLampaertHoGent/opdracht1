import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GokService {
  gokken = [];
  constructor() { }

  toevoegen(gok) {
    this.gokken.push(gok);
  }

  weergeven() {
    return this.gokken;
  }

  legen() {
    this.gokken = [];
    return this.gokken;
  }
}
