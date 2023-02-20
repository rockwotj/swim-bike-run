import {assertNever} from "./util";

export enum SportType {
  SWIM = "swim", BIKE = "bike", RUN = "run"
}

export class Sport {
  constructor(readonly type: SportType) {
  }

  static forType(type: string | undefined | null): Sport | null {
    return ALL_SPORTS.find((s) => s.type === type) || null;
  }

  asTitle(): string {
    switch (this.type) {
      case SportType.RUN:
        return "Run";
      case SportType.BIKE:
        return "Bike";
      case SportType.SWIM:
        return "Swim";
      default:
        assertNever(this.type);
    }
  }
}

export const ALL_SPORTS: readonly Sport[] = Object.values(SportType).map((sportType) => new Sport(sportType));

