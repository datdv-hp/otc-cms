export type IRequestCreateAwardBodyDTO = {
  name: string;
  step_value: number;
  icon: string | ArrayBuffer | null;
  description: string;
};

export type IRequestUpdateAwardBodyDTO = Partial<IRequestCreateAwardBodyDTO>;
