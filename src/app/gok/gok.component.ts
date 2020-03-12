import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { GokService } from '../gok.service';
import { GoktimerService } from '../goktimer.service';

@Component({
  selector: 'app-gok',
  templateUrl: './gok.component.html',
  styleUrls: ['./gok.component.css']
})
export class GokComponent implements OnInit {
  gokForm;
  gokken = [];
  gokRemaining: number = 10;
  secondsCount: number = 60;
  randomGetal: number = 0;
  gokReden: string = "";
  gokVoltooid: boolean = false;

  constructor(
    private gokService: GokService,
    private goktimerService: GoktimerService,
    private formBuilder: FormBuilder
  ) {
    goktimerService.seconds.subscribe((seconds) => this.secondsCount = seconds);
    this.gokForm = this.formBuilder.group({
      gok: 0
    });
  }

  ngOnInit() {
    this.gokken = this.gokService.weergeven();
    this.gokRemaining = 10 - this.gokken.length;
    this.randomGetal = this.gokService.randomGetal;
  }

  onSubmit(gokData) {
    this.gokService.toevoegen(gokData.gok);

    this.gokken = this.gokService.weergeven();
    this.gokRemaining = 10 - this.gokken.length;

    if (gokData.gok == this.randomGetal) {
      this.gokReden = `Het random getal was inderdaad ${this.randomGetal}`;
      this.goktimerService.stopTimer();
      this.gokVoltooid = true;
    } else if (gokData.gok < this.randomGetal) this.gokReden = `Het random getal ligt HOGER dan ${gokData.gok}`;
    else if (gokData.gok > this.randomGetal) this.gokReden = `Het random getal ligt LAGER dan ${gokData.gok}`;
  }

  public herstartSpel = () => {
    this.gokVoltooid = false;
    this.gokService.legen();
    this.gokken = this.gokService.weergeven();
    this.gokRemaining = 10 - this.gokken.length;
    this.gokReden = "";
    this.gokService.nieuwRandomGetal();
    this.randomGetal = this.gokService.randomGetal;
    this.goktimerService.startTimer();
  }
}

