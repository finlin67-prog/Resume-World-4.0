export interface Attraction {
  id: string;
  name: string;
  company: string;
  location: string;
  category: string;
  startDate: string;
  endDate: string;
  duration: string;
  image: string;
  description: string;
  achievements: string[];
  skills: string[];
  technologies: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  gtmLink?: string; // For future GTMStack.pro links
}

export interface Zone {
  id: string;
  name: string;
  color: string;
  description: string;
  period: string;
  coordinates: Array<[number, number]>;
}

export interface Skill {
  name: string;
  category: string;
  roles: string[];
}

export interface FilterState {
  query: string;
  minRating: number;
  category: string;
  skillFilter?: string;
}

export type SortOption = "chronological" | "name" | "duration";
export type ViewMode = "list" | "map" | "timeline";

export interface MapInstance {
  flyTo: (options: { center: [number, number]; zoom: number; duration?: number }) => void;
  getZoom: () => number;
  getCenter: () => { lng: number; lat: number };
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  resize: () => void;
}
