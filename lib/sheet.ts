import { GoogleSpreadsheet } from "google-spreadsheet";

const { SPREADSHEET_ID, SA_EMAIL } = process.env;
const SA_KEY = process.env.SA_KEY.replace(/\\n/gm, "\n");

export interface SpreadsheetRow extends Record<string, string | number> {
  timestamp: string;
  lat: number;
  lon: number;
}

export async function insertCoordinates(
  lat: number,
  lon: number
): Promise<void> {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: SA_EMAIL,
    private_key: SA_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const row: SpreadsheetRow = {
    timestamp: new Date().toISOString(),
    lat,
    lon,
  };

  await sheet.addRow(row);
}
