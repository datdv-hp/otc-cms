export type IResponseAwardDTO = {
  id: number | string;
  name_vi?: string;
  name_en?: string;
  step_value: number;
  description_vi?: string;
  description_en?: string;
  icon?: {
    name: string;
    mimeType: string;
    url: string;
  } | null;
  created_at: Date | string;
};
