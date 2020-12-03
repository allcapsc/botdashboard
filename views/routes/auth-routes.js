const { DASH_URL, ID } = require('../../config.js');
const authClient = require('../../auth-client.js');
const sessions = require('../../sessions.js');
const express = require('express');
const router = express.Router();
const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${ID}&permissions=8&scope=bot&redirect_uri=${DASH_URL}/`;
const loginURL = `https://discord.com/api/oauth2/authorize?client_id=${ID}&redirect_uri=${DASH_URL}/auth&response_type=code&scope=identify%20guilds&prompt=none`;

router.get('/invite', (req, res) => res.redirect(inviteURL));
router.get('/login', (req, res) => res.redirect(loginURL));

router.get('/auth', async (req, res) => {
  try {
    const code = req.query.code;
    const key = await authClient.getAccess(code);

    res.cookies.set('key', key);
    res.redirect('/dashboard');
  } catch {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  res.cookies.set('key', '');

  res.redirect('/');
});

module.exports = router;