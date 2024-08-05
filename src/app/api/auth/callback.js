import { getAccessToken } from '../googleDrive';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('No authorization code provided');
    return;
  }

  try {
    await getAccessToken(code);
    res.redirect('/');
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Authentication failed');
  }
}
