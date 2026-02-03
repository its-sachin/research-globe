import fs from 'node:fs/promises';
import path from 'node:path';
import XLSX from 'xlsx';

const repoRoot = process.cwd();
const workbookPath = path.join(repoRoot, 'content', 'knowledge_bay_content.xlsx');
const backupPath = path.join(repoRoot, 'content', 'knowledge_bay_content.xlsx.bak');

function sheetFromRows(rows) {
  return XLSX.utils.json_to_sheet(rows, { skipHeader: false });
}

function main() {
  const workbook = XLSX.readFile(workbookPath, { cellDates: false });

  const rows = [
    {
      Id: 'iit-delhi',
      Institution: 'IIT Delhi',
      City: 'New Delhi',
      Country: 'India',
      Lat: 28.545,
      Lng: 77.1926,
      'Focus Areas': 'Graph ML',
      Description: 'Placeholder: this needs to be filled',
      'Peoples Involved': 'Placeholder: this needs to be filled',
      'Website Link': 'Placeholder: this needs to be filled',
      'Image Path': 'Placeholder: this needs to be filled'
    },
    {
      Id: 'ntu-singapore',
      Institution: 'NTU Singapore',
      City: 'Singapore',
      Country: 'Singapore',
      Lat: 1.3483,
      Lng: 103.6831,
      'Focus Areas': 'Representation learning; Federated learning; Fair & Bias',
      Description: 'Placeholder: this needs to be filled',
      'Peoples Involved': 'Placeholder: this needs to be filled',
      'Website Link': 'Placeholder: this needs to be filled',
      'Image Path': 'Placeholder: this needs to be filled'
    },
    {
      Id: 'mit',
      Institution: 'MIT',
      City: 'Cambridge',
      Country: 'USA',
      Lat: 42.3601,
      Lng: -71.0942,
      'Focus Areas': 'Post pandemic social analysis',
      Description: 'Placeholder: this needs to be filled',
      'Peoples Involved': 'Placeholder: this needs to be filled',
      'Website Link': 'Placeholder: this needs to be filled',
      'Image Path': 'Placeholder: this needs to be filled'
    },
    {
      Id: 'imperial-college-london',
      Institution: 'Imperial College of London',
      City: 'London',
      Country: 'UK',
      Lat: 51.4988,
      Lng: -0.1749,
      'Focus Areas': 'Spending forecasting',
      Description: 'Placeholder: this needs to be filled',
      'Peoples Involved': 'Placeholder: this needs to be filled',
      'Website Link': 'Placeholder: this needs to be filled',
      'Image Path': 'Placeholder: this needs to be filled'
    },
    {
      Id: 'canada-universities',
      Institution: 'Canada Universities',
      City: 'Placeholder: this needs to be filled',
      Country: 'Canada',
      Lat: 'Placeholder: this needs to be filled',
      Lng: 'Placeholder: this needs to be filled',
      'Focus Areas': 'Multiple projects',
      Description: 'Placeholder: this needs to be filled',
      'Peoples Involved': 'Placeholder: this needs to be filled',
      'Website Link': 'Placeholder: this needs to be filled',
      'Image Path': 'Placeholder: this needs to be filled'
    }
  ];

  const sheetName = 'UniversityCollaborations';
  const sheet = sheetFromRows(rows);

  // Replace or add the sheet.
  workbook.Sheets[sheetName] = sheet;
  if (!workbook.SheetNames.includes(sheetName)) {
    workbook.SheetNames.push(sheetName);
  }

  return fs
    .copyFile(workbookPath, backupPath)
    .then(() => {
      XLSX.writeFile(workbook, workbookPath);
      console.log(`Backed up: ${path.relative(repoRoot, backupPath)}`);
      console.log(`Updated sheet: ${sheetName} in ${path.relative(repoRoot, workbookPath)}`);
    })
    .catch((err) => {
      // Still attempt write if backup fails (e.g., permissions).
      console.warn('Backup failed:', err?.message ?? err);
      XLSX.writeFile(workbook, workbookPath);
      console.log(`Updated sheet: ${sheetName} in ${path.relative(repoRoot, workbookPath)}`);
    });
}

await main();
