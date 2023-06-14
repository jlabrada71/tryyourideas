export class DateProvider {
  constructor() {
  }
  minutesFromNow( minutes ) {
    return new Date(Date.now() + minutes * 60 * 1000)
  }
}