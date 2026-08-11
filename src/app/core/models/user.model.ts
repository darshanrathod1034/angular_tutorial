// Represents one day in a trip itinerary
export interface ItineraryDay {
  day: number;
  places: string[];
  _id: string;
}

// Represents a single Trip
export interface Trip {
  _id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  preferences: string[];
  itinerary: ItineraryDay[];
  createdAt: string;
}

// Represents the full User object returned by GET /users/:id
export interface User {
  _id: string;
  fullname: string;
  email: string;
  picture?: string;
  phone?: number | string;
  googleId?: string | null;
  post?: string[];
  saved_places?: string[];
  preferences?: string[];
  trips?: Trip[];
  credits?: number;
  referralCode?: string;
  referredBy?: string | null;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

// Payload sent to PUT /users/:id
export interface UpdateProfilePayload {
  fullname: string;
  email: string;
  phone?: string | number;
}

// Response from PUT /users/:id
export interface UpdateProfileResponse {
  message: string;
  user: User;
}
