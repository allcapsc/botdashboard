const { model } = require('mongoose');

class GeneralModule {
  prefix = 'db!';
}

module.exports = model('guild', {
  _id: String,
  general: { type: Object, default: new GeneralModule() }
});