export interface Lake {
  _id: string;
  name: string;
  img?: string;
  location: string;
  coordinates: number;
  opening_hours?: {
    day: string;
    open: string;
    close: string;
  }[];
  typical_fish?: {
    _id: string;
    fish: Fish
  }[];
  county?: {
    _id: string;
    name: string;
  };
  water_depth?: number;
  steg_number?: number;
  description?: string;
  day_ticket?: {
    type: string;
    price: number;
  }[];
  link:string
}

export interface Fish {
  name: string;
  img: string;
}
