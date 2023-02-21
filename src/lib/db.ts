import Dexie, {Table} from 'dexie';

interface ShakePermission {
  readonly id: 'shake';
  status: PermissionState;
}

export type Permission = ShakePermission;

interface CompletedWorkout {
  readonly id?: number;
  readonly workout: string;
  readonly time: number;
}


export class AppDatabase extends Dexie {
  permissions!: Table<Permission, Permission['id']>; 
  completedWorkouts!: Table<CompletedWorkout, CompletedWorkout['id']>; 

  constructor() {
    super('app_database');
    this.version(1).stores({
      permissions: 'id',
    });
    this.version(2).stores({
      permissions: 'id',
      completedWorkouts: '++id'
    });
  }
}

export const db = new AppDatabase();

