export interface TouristPlace {
  name: string;
  description: string;
}

export interface State {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  bestTimeToVisit: string;
  imageUrl: string;
  topTouristPlaces: TouristPlace[];
}
