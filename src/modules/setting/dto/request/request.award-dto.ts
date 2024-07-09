export type IRequestCreateAwardBodyDTO = {
  name_vi?: string;
  name_en?: string;
  step_value: number;
  icon: string | ArrayBuffer | null;
  description_vi?: string;
  description_en?: string;
};

export type IRequestUpdateAwardBodyDTO = Partial<IRequestCreateAwardBodyDTO>;
