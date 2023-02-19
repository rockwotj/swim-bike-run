export class RNG {
  // LCG using GCC's constants
  private readonly m = 0x80000000; // 2**31;
  private readonly a = 1103515245;
  private readonly c = 12345;
  private state: number;

  constructor(seed: number = 0) {
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }
  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }
  nextFloat() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }
  nextRange(start: number, end: number) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }
  choice<T>(array: ReadonlyArray<T>) {
    return array[this.nextRange(0, array.length)];
  }
}

