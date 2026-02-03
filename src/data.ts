import type { ConferenceLocation } from './types';
import publicationsJson from './content/generated/publications.json';

export const conferenceData = publicationsJson as unknown as ConferenceLocation[];
