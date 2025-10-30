import { Component } from "@angular/core"

@Component({
  templateUrl: './counter-page.html',
})

export class CounterPage {
  counter = 10

  increaseBy(value: number) {
    this.counter += value
  }

  resetCounter() {
    this.counter = 10
  }
}
