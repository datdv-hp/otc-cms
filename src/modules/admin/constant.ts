export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export const StatusColor = {
  [AccountStatus.ACTIVE]: 'success',
  [AccountStatus.INACTIVE]: 'warning'
};
