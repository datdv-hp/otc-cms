export type IRequestCreateCashbackBodyDTO = {
  name: string;
  percent: number;
};

export type IRequestUpdateCashbackBodyDTO = Partial<IRequestCreateCashbackBodyDTO>;
