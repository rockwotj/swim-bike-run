import {assertNever} from "./util";

export enum SportType {
  SWIM = "swim", BIKE = "bike", RUN = "run"
}

export class Sport {
  constructor(readonly type: SportType) {
  }

  static forType(type: SportType): Sport;
  static forType(type: string | undefined | null): Sport | null;
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

  workouts(): readonly string[] {
    switch (this.type) {
      case SportType.RUN:
        return RUN_WORKOUTS;
      case SportType.BIKE:
        return BIKE_WORKOUTS;
      case SportType.SWIM:
        return SWIM_WORKOUTS;
      default:
        assertNever(this.type);
    }
  }
}

export const ALL_SPORTS: readonly Sport[] = Object.values(SportType).map((sportType) => new Sport(sportType));


export const SWIM_WORKOUTS: readonly string[] = [
  'Endurance (1-2 x week) Intensity Zones: 1-3\nSwim 60 min. Steady',
  'Endurance (1-2 x week) Intensity Zones: 1-3\nSwim 60 min. Steady',
  'Force (1 x week)  Intensity Zones: 4-5b\nSwim with paddles Interval duration: 4-60 min',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nSwim 10x25m on 1 min. Interval duration: 1-6 min.',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nSwim 10x25m on 1 min. Interval duration: 1-6 min.',
  'Muscular Endurance (1 x week)  Intensity Zones: 4-5a\nSwim 6x400m on 8 min. Interval duration: 18-60 min.',
  'Anaerobic Endurance (1 x week) Intensity Zones: 5b\nSwim 6x200m on 4 min. Interval duration: 12-30 min.',
  'Power (1 x week) Intensity Zones: 5c\nSwim 12x25m on 1 min. Interval duration: 1-6 min.'

];

export const BIKE_WORKOUTS: readonly string[] = [
  'Endurance (1-2 x week) Intensity Zones: 1-3\nBike 3 hours flat course',
  'Endurance (1-2 x week) Intensity Zones: 1-3\nBike 3 hours flat course',
  'Force (1 x week)  Intensity Zones: 4-5b\nBike hills seated 4-60 min.',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nBike 12x30 sec. [90 sec. Recovery interval] Interval duration: 1-6 min.',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nBike 12x30 sec. [90 sec. Recovery interval] Interval duration: 1-6 min.',
  'Muscular Endurance (1 x week)  Intensity Zones: 4-5a\nBike 4x6 min. [2 min. Recovery interval] Interval duration: 18-60 min.',
  'Anaerobic Endurance (1 x week) Intensity Zones: 5b\nBike 5x5 min. [5 min. Recovery interval] Interval duration: 12-30 min.',
  'Power (1 x week) Intensity Zones: 5c\nBike 6 x30 sec. on a hill [60 sec. Recovery interval] Interval duration: 1-6 min.',
];

export const RUN_WORKOUTS: readonly string[] = [
  'Endurance (1-2 x week) Intensity Zones: 1-3\nRun 90 min.',
  'Endurance (1-2 x week) Intensity Zones: 1-3\nRun 90 min.',
  'Force (1 x week)  Intensity Zones: 4-5b\nRun a hilly course. Interval duration: 4-60 min.',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nRun8x20 sec.[90 sec. Recovery interval] Interval duration: 1-6 min.',
  'Speed Skills (1-2x week) Intensity Zones: 5a-5c\nRun8x20 sec.[90 sec. Recovery interval] Interval duration: 1-6 min.',
  'Muscular Endurance (1 x week)  Intensity Zones: 4-5a\nRun 20 minutes. Steady state Interval duration: 20-40 min. steady state',
  'Anaerobic Endurance (1 x week) Intensity Zones: 5b\nRun 5x400m [400m Recovery interval]  Interval duration: 3-12 min.',
  'Power (1 x week) Intensity Zones: 5c\nRun 4x150m [250m Recovery interval]  Interval duration: 1-6 min. '
]

