import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { GokService } from '../gok.service';

@Component({
  selector: 'app-gok',
  templateUrl: './gok.component.html',
  styleUrls: ['./gok.component.css']
})
export class GokComponent implements OnInit {
  gokken;
  gokForm;

  timeLeft: number = 60;
  gokkenOver: number = 10;
  interval;
  randomGetal: number = Math.floor((Math.random() * 100) + 1);
  redenEinde = "";

  constructor(
    private gokService: GokService,
    private formBuilder: FormBuilder
  ) {
    this.gokForm = this.formBuilder.group({
      mijnGok: 0
    });
  }

  ngOnInit() {
    this.gokken = this.gokService.weergeven();
    this.startTimer();
  }

  voegGokToe(gok) {
    this.gokService.toevoegen(gok);
  }

  onSubmit(gokData) {
    this.gokService.toevoegen(gokData.mijnGok);
    this.gokkenOver--;

    if (gokData.mijnGok == this.randomGetal) {
      this.redenEinde = `U heeft gewonnen! Het random getal was inderdaad ${this.randomGetal}. Dit heeft u geraden in ${10 - this.gokkenOver} gokken en ${60 - this.timeLeft} seconden.\nHet spel begint opnieuw!!!`;
      this.pauseTimer();

      this.restartGame();
    } else {
      if (this.gokkenOver == 0) {
        this.resetTimer();
        this.redenEinde = "U heeft het maximum aantal gokken overschreden...\nHet spel begint opnieuw!!!";

        this.restartGame();
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
      else {
        this.resetTimer();
        this.redenEinde = "Uw 60 seconden zijn over...\nHet spel begint opnieuw!!!";

        this.restartGame();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

  restartGame() {
    this.resetTimer();
    this.timeLeft = 60;
    this.gokkenOver = 10;
    this.gokService.legen();
    this.randomGetal = Math.floor((Math.random() * 100) + 1);

    this.startTimer();
  }
}

