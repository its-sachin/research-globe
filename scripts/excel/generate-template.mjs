// NOTE: Template generation has been intentionally disabled.
// The master workbook is now edited manually, and regenerating it would overwrite content.
console.error(
  'This project no longer supports generating the master Excel template.\n' +
    'Edit content/knowledge_bay_content.xlsx directly, then run: npm run excel:convert'
);
process.exit(1);

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'content');
const OUT_PATH = path.join(OUT_DIR, 'knowledge_bay_content_local.xlsx');

function asString(value) {
  if (value == null) return '';
  return String(value);
}

function rowsFromSheet(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
}

async function loadExistingPublicationsJson() {
  const publicationsPath = path.join(repoRoot, 'src', 'content', 'generated', 'publications.json');
  try {
    const txt = await fs.readFile(publicationsPath, 'utf8');
    const parsed = JSON.parse(txt);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function addSheet(workbook, name, rows) {
  const sheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
  XLSX.utils.book_append_sheet(workbook, sheet, name);
}

async function loadExistingEventsFromAsset() {
  const excelPath = path.join(repoRoot, 'assets', 'random_events.xlsx');
  try {
    const buf = await fs.readFile(excelPath);
    const wb = XLSX.read(buf, { type: 'buffer' });
    const first = wb.SheetNames[0];
    if (!first) return [];
    return rowsFromSheet(wb, first);
  } catch {
    return [];
  }
}

function normalizeEventRow(row) {
  const name = asString(row['Event Name'] ?? row['Name'] ?? row['event name'] ?? row['event']).trim();
  const destination = asString(row['Event Destination'] ?? row['Destination'] ?? row['Location'] ?? row['Place']).trim();
  const description = asString(row['Event Description'] ?? row['Description'] ?? row['Desc']).trim();
  const link = asString(row['Event Website Link'] ?? row['Event Link'] ?? row['Link'] ?? row['URL'] ?? row['Url']).trim();
  const imagePath = asString(row['Event Image Path'] ?? row['Event Image Link'] ?? row['Image'] ?? row['Image Link'] ?? row['image']).trim();
  const type = asString(row['Type'] ?? row['Category'] ?? row['Kind']).trim().toLowerCase();
  const position = asString(row['Position'] ?? row['Pos']).trim();

  return { name, destination, description, link, imagePath, type, position };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const wb = XLSX.utils.book_new();

  // ---------- Page copy sheets (Key/Text style) ----------
  addSheet(wb, 'LandingPage', [
    { Key: 'welcomeTitle', Text: 'Welcome to Knowledge Bay', IconKey: '', Notes: 'Main landing H1' },
    { Key: 'welcomeSubtitle', Text: 'Explore research publications across the globe', IconKey: '', Notes: 'Landing subtitle' },
    { Key: 'startButton', Text: 'Start Exploring', IconKey: '', Notes: 'Primary CTA button text' }
  ]);

  addSheet(wb, 'MastercardAIProductsView', [
    { Key: 'title', Text: 'AI in Mastercard', IconKey: '', Notes: 'Products page title' },
    { Key: 'subtitle', Text: 'Products and capabilities powering trust, security, and experiences.', IconKey: '', Notes: 'Products page subtitle' },
    { Key: 'backButton', Text: '← AI Evolution', IconKey: '', Notes: 'Back button text' }
  ]);

  addSheet(wb, 'TopicLanding', [
    { Key: 'title', Text: 'Choose a research topic', IconKey: '', Notes: 'Topic landing title' },
    { Key: 'subtitle', Text: 'Tap a bubble to jump into its globe.', IconKey: '', Notes: 'Topic landing subtitle' },
    { Key: 'backButton', Text: '← Back', IconKey: '', Notes: 'Back button text' },
    { Key: 'empty', Text: 'No topics found.', IconKey: '', Notes: 'Empty state text' },
    { Key: 'allTopicsCta', Text: 'Or explore all topics →', IconKey: '', Notes: 'Footer CTA' }
  ]);

  addSheet(wb, 'TopicSidebar', [
    { Key: 'title', Text: 'Topics', IconKey: '', Notes: 'Sidebar title' },
    { Key: 'fallbackSelected', Text: 'Topic', IconKey: '', Notes: 'Fallback selected label' },
    { Key: 'collapse', Text: 'Collapse topics', IconKey: '', Notes: 'Collapse aria label' },
    { Key: 'expand', Text: 'Expand topics', IconKey: '', Notes: 'Expand aria label' },
    { Key: 'tip', Text: 'Tip: switch topics without leaving the globe.', IconKey: '', Notes: 'Footer hint' }
  ]);

  addSheet(wb, 'AIGEventsHackathons', [
    { Key: 'eventsTitle', Text: 'Events', IconKey: '', Notes: 'Events page header title' },
    { Key: 'eventsSubtitle', Text: 'Talks • demos • meetups', IconKey: '', Notes: 'Events page header subtitle' },
    { Key: 'hackathonsTitle', Text: 'Hackathons', IconKey: '', Notes: 'Hackathons page header title' },
    { Key: 'hackathonsSubtitle', Text: 'Build • iterate • ship', IconKey: '', Notes: 'Hackathons page header subtitle' },
    { Key: 'loading', Text: 'Loading {{kind}}…', IconKey: '', Notes: 'Use {{kind}} = events/hackathons' },
    { Key: 'noneFound', Text: 'No {{kind}} found.', IconKey: '', Notes: 'Empty state' },
    { Key: 'openLink', Text: 'Open ↗', IconKey: '', Notes: 'Card CTA when link exists' },
    { Key: 'noLink', Text: 'No link', IconKey: '', Notes: 'Card CTA when link missing' },
    { Key: 'tipType', Text: 'Tip: add a “Type” column with values “event” / “hackathon” to split lists.', IconKey: '', Notes: 'Legacy tip (kept)' }
  ]);

  addSheet(wb, 'AIGAIGateway', [
    { Key: 'backButton', Text: '← Back', IconKey: '', Notes: 'Back button text' },
    { Key: 'headerTitle', Text: 'AIG AI Ecosystem', IconKey: '', Notes: 'Gateway page title' },
    { Key: 'headerSubtitle', Text: 'Select an area to explore, then jump to topics.', IconKey: '', Notes: 'Gateway page subtitle' }
  ]);

  addSheet(wb, 'App', [
    { Key: 'globeTitle', Text: 'Research Publications Globe', IconKey: '', Notes: 'Globe header title' },
    { Key: 'globeSubtitle', Text: 'Explore our global research footprint • {{topic}}', IconKey: '', Notes: 'Globe header subtitle; supports {{topic}}' },
    { Key: 'backToTopics', Text: '← Back', IconKey: '', Notes: 'Back-to-topics button label (globe view)' }
  ]);

  // ---------- Structured sheets ----------
  addSheet(wb, 'AIEvolutionCards', [
    { Id: 'ai-evolution', Title: 'AI Evolution', Description: 'From rules → models → agents, at speed.', Accent: '#FFE082', IconKey: 'aiEvolution' },
    { Id: 'ai-mastercard', Title: 'AI in Mastercard', Description: 'Trust, security, and experiences enhanced.', Accent: '#FFB74D', IconKey: 'aiMastercard' },
    { Id: 'ai-aig', Title: 'AI in AIG', Description: 'Risk insights, faster decisions, smarter ops.', Accent: '#FFA726', IconKey: 'aiAig' }
  ]);

  addSheet(wb, 'AIGAIGatewayNodes', [
    { Id: 'hackathons', Title: 'Hackathons', Subtitle: 'Build • iterate • ship', Tint: 'rgba(255, 170, 0, 1)', IconKey: 'hackathons' },
    { Id: 'events', Title: 'Events', Subtitle: 'Talks • demos • meetups', Tint: 'rgba(247, 158, 27, 1)', IconKey: 'events' },
    { Id: 'university-collaborations', Title: 'University Collaborations', Subtitle: 'Labs • research • talent', Tint: 'rgba(255, 179, 71, 1)', IconKey: 'university' },
    { Id: 'publications', Title: 'Publications', Subtitle: 'Papers • patents • insights', Tint: 'rgba(235, 0, 27, 0.9)', IconKey: 'publications' }
  ]);

  addSheet(wb, 'Products', [
    { Id: 'fraud-risk', Label: 'Fraud & Risk AI', IconKey: 'product.fraudRisk' },
    { Id: 'identity', Label: 'Identity', IconKey: 'product.identity' },
    { Id: 'cyber', Label: 'Cyber', IconKey: 'product.cyber' },
    { Id: 'personalization', Label: 'Personalization', IconKey: 'product.personalization' },
    { Id: 'tokenization', Label: 'Tokenization', IconKey: 'product.tokenization' },
    { Id: 'insights', Label: 'Insights', IconKey: 'product.insights' }
  ]);

  // University collaborations (currently random values in your description; include sample placeholders)
  addSheet(wb, 'UniversityCollaborations', [
    {
      'Collaboration Name': 'Example Lab Partnership',
      Destination: 'Global',
      Description: 'Joint research on applied AI for risk and underwriting.',
      'Peoples Involved': 'Jane Doe; John Smith'
    }
  ]);

  // Events / Hackathons: bootstrap from existing assets/random_events.xlsx when present.
  const existingEvents = await loadExistingEventsFromAsset();
  const normalized = existingEvents.map(normalizeEventRow).filter((r) => r.name);
  const events = normalized.filter((r) => !r.type || r.type === 'event');
  const hackathons = normalized.filter((r) => r.type === 'hackathon');

  addSheet(
    wb,
    'Events',
    (events.length ? events : [
      {
        'Event Name': 'Example Event',
        'Event Destination': 'Mumbai, India',
        'Event Description': 'An example event row. Replace with real content.',
        'Event Website Link': 'https://example.com',
        'Event Image Path': '/assets/events/example.png'
      }
    ]).map((r) => ({
      'Event Name': r.name,
      'Event Destination': r.destination,
      'Event Description': r.description,
      'Event Website Link': r.link,
      'Event Image Path': r.imagePath
    }))
  );

  addSheet(
    wb,
    'Hackathons',
    (hackathons.length ? hackathons : [
      {
        'Event Name': 'Example Hackathon',
        'Event Destination': 'Bengaluru, India',
        'Event Description': 'An example hackathon row. Replace with real content.',
        'Event Website Link': 'https://example.com',
        'Event Image Path': '/assets/events/example.png',
        Position: 'center'
      }
    ]).map((r) => ({
      'Event Name': r.name,
      'Event Destination': r.destination,
      'Event Description': r.description,
      'Event Website Link': r.link,
      'Event Image Path': r.imagePath,
      Position: r.position || 'center'
    }))
  );

  // Publications: bootstrap from already-generated JSON when available.
  // This keeps the template stable even after the app switches to Excel-driven content.
  const conferenceData = await loadExistingPublicationsJson();
  const pubRows = [];

  const first = Array.isArray(conferenceData) ? conferenceData[0] : null;
  const isNewSchema = Boolean(first && typeof first === 'object' && Array.isArray(first.conferences));

  if (isNewSchema) {
    for (const venue of conferenceData) {
      for (const conf of venue.conferences ?? []) {
        for (const paper of conf.papers ?? []) {
          pubRows.push({
            'Conference ID': conf.conferenceId,
            City: venue.city,
            Country: venue.country,
            Lat: venue.lat,
            Lng: venue.lng,
            'Conference Name': conf.conferenceName,
            Date: conf.date,
            'Paper ID': paper.id,
            'Paper Title': paper.title,
            Topic: paper.topic,
            Authors: Array.isArray(paper.authors) ? paper.authors.join('; ') : asString(paper.authors),
            Abstract: paper.abstract,
            Year: paper.year,
            DOI: paper.doi ?? '',
            Keywords: Array.isArray(paper.keywords) ? paper.keywords.join('; ') : asString(paper.keywords)
          });
        }
      }
    }
  } else {
    // Backward compatibility: old schema was a flat list keyed by conference id.
    for (const conf of conferenceData) {
      for (const paper of conf.papers ?? []) {
        pubRows.push({
          'Conference ID': conf.id,
          City: conf.city,
          Country: conf.country,
          Lat: conf.lat,
          Lng: conf.lng,
          'Conference Name': conf.conferenceName,
          Date: conf.date,
          'Paper ID': paper.id,
          'Paper Title': paper.title,
          Topic: paper.topic,
          Authors: Array.isArray(paper.authors) ? paper.authors.join('; ') : asString(paper.authors),
          Abstract: paper.abstract,
          Year: paper.year,
          DOI: paper.doi ?? '',
          Keywords: Array.isArray(paper.keywords) ? paper.keywords.join('; ') : asString(paper.keywords)
        });
      }
    }
  }

  addSheet(wb, 'Publications', pubRows.length ? pubRows : [
    {
      'Conference ID': '1',
      City: 'San Francisco',
      Country: 'USA',
      Lat: 37.7749,
      Lng: -122.4194,
      'Conference Name': 'Example Conference',
      Date: 'October 2024',
      'Paper ID': 'p1',
      'Paper Title': 'Example Paper',
      Topic: 'Computer Vision',
      Authors: 'Author One; Author Two',
      Abstract: 'Short abstract…',
      Year: 2024,
      DOI: '',
      Keywords: 'keyword1; keyword2'
    }
  ]);

  XLSX.writeFile(wb, OUT_PATH);

  console.log(`Wrote ${path.relative(repoRoot, OUT_PATH)}`);
  console.log('Next: run `npm run excel:convert` to generate JSON content files.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
