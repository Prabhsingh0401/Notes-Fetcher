import { generateAuthUrl } from '../googleDrive';

export default async function handler(req, res) {
  const authUrl = generateAuthUrl();
  res.redirect(authUrl);
}