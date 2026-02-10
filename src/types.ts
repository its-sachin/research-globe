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

export interface ConferenceInstance {
  conferenceId: string;
  year: number;
  conferenceName: string;
  date: string;
  papers: Paper[];
}

// A single physical venue (globe marker). One venue can host multiple conferences,
// and each conference is uniquely defined by (conferenceId, year).
export interface PublicationVenueLocation {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  conferences: ConferenceInstance[];
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
