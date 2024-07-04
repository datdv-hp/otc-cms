export type IResponseAwardDTO = {
  id: number | string;
  name: string;
  step_value: number;
  description: string;
  icon?: {
    name: string;
    mimeType: string;
    url: string;
  } | null;
  created_at: Date | string;
};
