export interface Catch {
  _id?: string;
  fish?: {
    _id: string;
    name: string;
    img?: string;
  };
  method?: {
    _id: string;
    name: string;
  };
  lake?: {
    _id: string;
    name: string;
  };
  user?: {
    _id: string;
    name: string;
  };
  length: number;
  weight: number;
  date: string;
  bait: string;
  description: string;
  img?: string;
}

export interface CatchResponse {
  success: boolean;
  data: Catch[];
}

