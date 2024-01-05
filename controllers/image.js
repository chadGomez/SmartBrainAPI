const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'a8b3cc27bc9042d99ac534dbbac8338b'
});

const handleApiCall = (req, resp) => {
  app.models
    .predict('face-detection', req.body.input)
    .then(data => resp.json(data))
    .catch(err => resp.status(400).json('Unable to work with API'))
}

const handleImage = db => (req, resp) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => resp.json(entries[0].entries))
    .catch(err => resp.status(400).json('Unable to get entries'))
};

module.exports = {
  handleImage,
  handleApiCall
};