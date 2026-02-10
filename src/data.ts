import type { PublicationVenueLocation } from './types';
import publicationsJson from './content/generated/publications.json';

export const publicationVenues = publicationsJson as unknown as PublicationVenueLocation[];
