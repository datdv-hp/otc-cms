export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const StatusColor = {
  [AccountStatus.ACTIVE]: 'success',
  [AccountStatus.INACTIVE]: 'error'
};
