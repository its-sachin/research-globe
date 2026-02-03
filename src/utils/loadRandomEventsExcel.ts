export type RandomEventItem = {
  name: string;
  destination: string;
  description: string;
  link: string;
  imageLink: string;
  type?: string;
};

function asString(value: unknown): string {
  if (value == null) return '';
  return String(value);
}

function normalizeType(value: string): string {
  const cleaned = value.trim().toLowerCase();
  if (!cleaned) return '';
  if (cleaned === 'hackathon' || cleaned === 'hackathons') return 'hackathon';
  if (cleaned === 'event' || cleaned === 'events') return 'event';
  return cleaned;
}

export async function loadRandomEventsExcel(excelUrl: string): Promise<RandomEventItem[]> {
  const XLSX = await import('xlsx');

  const response = await fetch(excelUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Excel: ${response.status} ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) return [];

  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    raw: false
  });

  return rows
    .map((row): RandomEventItem => {
      const name = asString(row['Event Name'] ?? row['Name'] ?? row['event name'] ?? row['event']).trim();
      const destination = asString(row['Event Destination'] ?? row['Destination'] ?? row['Location'] ?? row['Place']).trim();
      const description = asString(row['Event Description'] ?? row['Description'] ?? row['Desc']).trim();
      const link = asString(row['Event Link'] ?? row['Link'] ?? row['URL'] ?? row['Url']).trim();
      const imageLink = asString(row['Event Image Link'] ?? row['Image'] ?? row['Image Link'] ?? row['image']).trim();
      const type = normalizeType(asString(row['Type'] ?? row['Category'] ?? row['Kind']));

      return {
        name,
        destination,
        description,
        link,
        imageLink,
        type: type || undefined
      };
    })
    .filter((item) => item.name.length > 0);
}
