import Dexie, {Table} from 'dexie';

interface ShakePermission {
  readonly id: 'shake';
  status: PermissionState;
}

export type Permission = ShakePermission;


export class AppDatabase extends Dexie {
  permissions!: Table<Permission, Permission['id']>; 

  constructor() {
    super('app_database');
    this.version(1).stores({
      permissions: 'id',
    });
  }
}

export const db = new AppDatabase();

