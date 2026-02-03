export interface Paper {
  id: string;
  title: string;
  topic: string;
  authors: string[];
  abstract: string;
  year: number;
  doi?: string;
  keywords: string[];
}

export interface ConferenceLocation {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  conferenceName: string;
  date: string;
  papers: Paper[];
}

export interface UniversityCollaborationLocation {
  id: string;
  institution: string;
  city: string;
  country: string;
  lat: number | null;
  lng: number | null;
  focusAreas: string[];
  description: string;
  people: string[];
  websiteLink: string;
  imagePath: string;
}
