export interface Trip {
  _id: string;
  tripName: string;
  tripDestination: string;
  destinationCoords: [number];
  tripDate: Date;
  description: string;
}

export interface TripContextType {
  trips: Trip[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => void;
}
