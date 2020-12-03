const sessions = require('./sessions.js');

module.exports.updateGuilds = async (req, res, next) => {
  try {
    const key = res.cookies.get('key') != null ? res.cookies.get('key') : req.get('Authorization');
    if (key) {
      const { guilds } = await sessions.get(key);
      res.locals.guilds = guilds;
    }
  } finally {
    return next();
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const key = res.cookies.get('key') != null ? res.cookies.get('key') : req.get('Authorization');
    if (key) {
      const { authUser } = await sessions.get(key);
      res.locals.user = authUser;
    }
  } finally {
    return next();
  }
};

module.exports.validateGuild = async (req, res, next) => {
  res.locals.guild = res.locals.guilds.find(g => g.id === req.params.id);
  return (res.locals.guild)
    ? next()
    : res.redirect('/');
};

module.exports.validateUser = async (req, res, next) => {
  return (res.locals.user)
    ? next()
    : res.redirect('/');
};