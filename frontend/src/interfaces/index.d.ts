export interface IHomeProps {
  latitude: number | null;
  longitude: number | null;
}

interface Location {
  lat: number;
  lng: number;
}

interface UrgentCareFacility {
  id: string | null | undefined;
  name: string;
  location: Location;
  icon: string;
  image: string;
  rating: number;
  user_ratings_total: number;
  address: string;
  phone: string;
  open_now: boolean;
  open_hours: string;
  distance: string;
  duration: string;
}
