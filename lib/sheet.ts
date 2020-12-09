import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { Entry } from "./entry";

const { SPREADSHEET_ID, SA_EMAIL } = process.env;
const SA_KEY = process.env.SA_KEY.replace(/\\n/gm, "\n");

export interface SpreadsheetRow extends Record<string, string | number> {
  timestamp: string;
  lat: number;
  lng: number;
}

export async function getWorksheet(): Promise<GoogleSpreadsheetWorksheet> {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: SA_EMAIL,
    private_key: SA_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  return sheet;
}

export async function insertCoordinates(
  lat: number,
  lng: number
): Promise<void> {
  const sheet = await getWorksheet();

  const row: SpreadsheetRow = {
    timestamp: new Date().toISOString(),
    lat,
    lng,
  };

  await sheet.addRow(row);
}

/**
 * Convert `1,1` (string) to `1.1` (number).
 */
function parseStupidNumber(input: string): number {
  return parseFloat(input.replace(",", ".").replace("−", "-")); // Replace bad characters.
}

export async function fetchEntries(): Promise<Entry[]> {
  const sheet = await getWorksheet();

  const rows = await sheet.getRows();

  return rows.reverse().map((row) => ({
    timestamp: new Date(row.timestamp).toISOString(),
    lat: parseStupidNumber(row.lat),
    lng: parseStupidNumber(row.lng),
  }));
}
