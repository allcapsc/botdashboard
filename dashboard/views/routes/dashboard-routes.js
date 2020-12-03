const client = require("../../../index.js")
const express = require("express");
const { validateGuild, validateUser } = require("../../middleware");
const guilds = require('../../data/guilds.js');
const router = express.Router();
const db = require("quick.db");

router.get("/dashboard", validateUser, async (req, res) => {
  res.render("dashboard", {
    useru: client.user.username,
    avatar: client.user.displayAvatarURL({ format: `png`, dynamic: true }),
  });
});

router.get('/servers/:id', validateGuild, async (req, res) => {
  const guild = client.guilds.cache.get(req.params.id);
  if (!guild) return res.render("/");

  const savedGuild = await guilds.get(guild);
  res.render('show', {
    savedGuild
  });
});

router.put("/servers/:id/:module", validateGuild, async (req, res) => {
  let { id, module } = req.params;

  const savedGuild = await guilds.get({ id });
  if (module === "general") module = "prefix";
  if (module === "prefix") {
    if (req.body.prefix) {
      db.set(`gprefix_${savedGuild.id}`, req.body.prefix);
    }
  }
  
  res.redirect(`/servers/${id}`);
});

module.exports = router;