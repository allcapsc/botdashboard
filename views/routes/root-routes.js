const client = require("../../index.js")
const { DASH_URL, ID } = require("../../config.js");
const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${ID}&permissions=8&scope=bot&redirect_uri=${DASH_URL}/`;
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.render("index", {
  useru: client.user.username,
  avatar: client.user.displayAvatarURL({ format: `png`, dynamic: true }),
  boturl: inviteURL
}));

module.exports = router;