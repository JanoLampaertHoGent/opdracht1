import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoktimerService {
  private counter = 60;
  timer;

  secondsSubject: Subject<number> = new Subject<number>();
  seconds = this.secondsSubject.asObservable();

  constructor() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.counter--;
      this.secondsSubject.next(this.counter);

      if (this.counter == 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  stopTimer() {
    this.pauseTimer();
    this.counter = 60;
  }
}
