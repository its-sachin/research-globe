import fs from 'node:fs/promises';
import path from 'node:path';
import XLSX from 'xlsx';

const repoRoot = process.cwd();

const DEFAULT_XLSX = path.join(repoRoot, 'content', 'knowledge_bay_content.xlsx');
const OUT_ROOT = path.join(repoRoot, 'src', 'content', 'generated');

function asString(value) {
  if (value == null) return '';
  return String(value);
}

function ensureNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function ensureNumberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function splitList(value) {
  return asString(value)
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
}

function readWorkbook(xlsxPath) {
  return XLSX.readFile(xlsxPath, { cellDates: false });
}

function rowsFromSheet(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
}

async function writeJson(relPath, data) {
  const fullPath = path.join(OUT_ROOT, relPath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function sheetKeyValue(rows) {
  const out = {};
  for (const row of rows) {
    const key = asString(row.Key).trim();
    if (!key) continue;
    out[key] = {
      text: asString(row.Text ?? '').trim(),
      iconKey: asString(row.IconKey ?? '').trim() || undefined
    };
  }
  return out;
}

function normalizeEventRow(row) {
  return {
    name: asString(row['Event Name']).trim(),
    destination: asString(row['Event Destination']).trim(),
    description: asString(row['Event Description']).trim(),
    link: asString(row['Event Website Link']).trim(),
    imagePath: asString(row['Event Image Path']).trim(),
    position: asString(row.Position ?? '').trim() || undefined
  };
}

function normalizeUniversityRow(row) {
  // New (globe) schema preferred; keep old schema compatibility.
  const id = asString(row.Id).trim();
  const institution = asString(row.Institution).trim();

  if (id || institution) {
    return {
      id,
      institution,
      city: asString(row.City).trim(),
      country: asString(row.Country).trim(),
      lat: ensureNumberOrNull(row.Lat),
      lng: ensureNumberOrNull(row.Lng),
      focusAreas: splitList(row['Focus Areas']),
      description: asString(row.Description).trim(),
      people: splitList(row['Peoples Involved']),
      websiteLink: asString(row['Website Link']).trim(),
      imagePath: asString(row['Image Path']).trim()
    };
  }

  // Old schema fallback
  const name = asString(row['Collaboration Name']).trim();
  const destination = asString(row.Destination).trim();
  return {
    id: name ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : '',
    institution: name,
    city: destination,
    country: '',
    lat: null,
    lng: null,
    focusAreas: [],
    description: asString(row.Description).trim(),
    people: splitList(row['Peoples Involved']),
    websiteLink: '',
    imagePath: ''
  };
}

function normalizeProductRow(row) {
  return {
    id: asString(row.Id).trim(),
    label: asString(row.Label).trim(),
    iconKey: asString(row.IconKey).trim()
  };
}

function normalizeAiEvolutionCardRow(row) {
  return {
    id: asString(row.Id).trim(),
    title: asString(row.Title).trim(),
    description: asString(row.Description).trim(),
    accent: asString(row.Accent).trim(),
    iconKey: asString(row.IconKey).trim()
  };
}

function normalizeGatewayNodeRow(row) {
  return {
    id: asString(row.Id).trim(),
    title: asString(row.Title).trim(),
    subtitle: asString(row.Subtitle).trim(),
    tint: asString(row.Tint).trim(),
    iconKey: asString(row.IconKey).trim()
  };
}

function buildConferenceData(publicationRows) {
  const byId = new Map();

  for (const row of publicationRows) {
    const confId = asString(row['Conference ID']).trim();
    if (!confId) continue;

    const existing = byId.get(confId);
    const conf = existing ?? {
      id: confId,
      city: asString(row.City).trim(),
      country: asString(row.Country).trim(),
      lat: ensureNumber(row.Lat, 0),
      lng: ensureNumber(row.Lng, 0),
      conferenceName: asString(row['Conference Name']).trim(),
      date: asString(row.Date).trim(),
      papers: []
    };

    const paperId = asString(row['Paper ID']).trim();
    const title = asString(row['Paper Title']).trim();

    if (paperId && title) {
      conf.papers.push({
        id: paperId,
        title,
        topic: asString(row.Topic).trim(),
        authors: splitList(row.Authors),
        abstract: asString(row.Abstract).trim(),
        year: ensureNumber(row.Year, 0),
        doi: asString(row.DOI).trim() || undefined,
        keywords: splitList(row.Keywords)
      });
    }

    byId.set(confId, conf);
  }

  return Array.from(byId.values());
}

async function main() {
  const xlsxPath = process.argv[2] ? path.resolve(repoRoot, process.argv[2]) : DEFAULT_XLSX;

  const workbook = readWorkbook(xlsxPath);

  const pages = {
    landing: sheetKeyValue(rowsFromSheet(workbook, 'LandingPage')),
    mcProducts: sheetKeyValue(rowsFromSheet(workbook, 'MastercardAIProductsView')),
    topicLanding: sheetKeyValue(rowsFromSheet(workbook, 'TopicLanding')),
    topicSidebar: sheetKeyValue(rowsFromSheet(workbook, 'TopicSidebar')),
    eventsHackathons: sheetKeyValue(rowsFromSheet(workbook, 'AIGEventsHackathons')),
    aigGateway: sheetKeyValue(rowsFromSheet(workbook, 'AIGAIGateway')),
    app: sheetKeyValue(rowsFromSheet(workbook, 'App'))
  };

  const aiEvolutionCards = rowsFromSheet(workbook, 'AIEvolutionCards')
    .map(normalizeAiEvolutionCardRow)
    .filter((c) => c.id && c.title);

  const gatewayNodes = rowsFromSheet(workbook, 'AIGAIGatewayNodes')
    .map(normalizeGatewayNodeRow)
    .filter((n) => n.id && n.title);

  const products = rowsFromSheet(workbook, 'Products')
    .map(normalizeProductRow)
    .filter((p) => p.id && p.label);

  const events = rowsFromSheet(workbook, 'Events')
    .map(normalizeEventRow)
    .filter((e) => e.name);

  const hackathons = rowsFromSheet(workbook, 'Hackathons')
    .map(normalizeEventRow)
    .filter((e) => e.name);

  const universityCollaborations = rowsFromSheet(workbook, 'UniversityCollaborations')
    .map(normalizeUniversityRow)
    .filter((c) => c.id && c.institution);

  const publicationsRows = rowsFromSheet(workbook, 'Publications');
  const conferenceData = buildConferenceData(publicationsRows);

  await fs.rm(OUT_ROOT, { recursive: true, force: true });
  await fs.mkdir(OUT_ROOT, { recursive: true });

  await writeJson('pages.json', pages);
  await writeJson('ai-evolution-cards.json', aiEvolutionCards);
  await writeJson('aig-gateway-nodes.json', gatewayNodes);
  await writeJson('products.json', products);
  await writeJson('events.json', events);
  await writeJson('hackathons.json', hackathons);
  await writeJson('university-collaborations.json', universityCollaborations);
  await writeJson('publications.json', conferenceData);

  console.log(`Read ${path.relative(repoRoot, xlsxPath)}`);
  console.log(`Wrote JSON content under ${path.relative(repoRoot, OUT_ROOT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
