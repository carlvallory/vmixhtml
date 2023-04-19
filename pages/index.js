import { google } from 'googleapis';
// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`

export async function getServerSideProps({ query }) {

  //Auth

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']});

  const sheets = google.sheets({ version: 'v4', auth})

  //Query

  const {id} = query;
  const range = `VmixHtml!A2:C2`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const texts = response.data.values.flat();

  return {
    props: {
      texts
    }
  }
}

export default function Text({ texts }) {
  return (
    <article>
      <h1>Texts</h1>
      <ul>
        {texts.map((v, i) => (
          <li key={i}>
            {v}
          </li>
        ))}
      </ul>
    </article>
  );
}