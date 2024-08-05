import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'Cliet_ID';
const CLIENT_SECRET = 'Client_Secret';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export default async function handler(req, res) {
  const { code, folderId, branch, semester, subject } = req.query;

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      res.status(200).json(tokens);
    } catch (error) {
      console.error('Error getting access token:', error);
      res.status(500).json({ error: 'Error getting access token' });
    }
  } else if (folderId && branch && semester && subject) {
    try {
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      const response = await drive.files.list({
        q: `'${folderId}' in parents and name contains '${branch}' and name contains 'Semester ${semester}' and name contains '${subject}'`,
        fields: 'files(id, name, webViewLink)',
      });
      res.status(200).json(response.data.files || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Error fetching notes' });
    }
  } else {
    console.error('Missing required query parameters');
    res.status(400).json({ error: 'Missing required query parameters' });
  }
}
