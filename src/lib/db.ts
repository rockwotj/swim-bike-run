import Dexie, {Table} from 'dexie';

interface CompletedWorkout {
  readonly id?: number;
  readonly workout: string;
  readonly time: number;
}

interface RaceDateSetting {
  readonly id: 'race-date';
  value: string;
}

export type Setting = RaceDateSetting;


export class AppDatabase extends Dexie {
  completedWorkouts!: Table<CompletedWorkout, CompletedWorkout['id']>; 
  settings!: Table<Setting, Setting['id']>; 

  constructor() {
    super('app_database');
    this.version(1).stores({
      permissions: 'id',
    });
    this.version(2).stores({
      permissions: 'id',
      completedWorkouts: '++id'
    });
    this.version(3).stores({
      permissions: 'id',
      completedWorkouts: '++id',
      settings: 'id',
    });
    this.version(4).stores({
      permissions: null,
      completedWorkouts: '++id',
      settings: 'id',
    });
  }
}

export const db = new AppDatabase();

