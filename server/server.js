const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cors = require('cors');
const app = express();

const client_id = '3e061ffda4b34b85aee198043534c955'; // Replace with your Client ID
const client_secret = 'bf6f925f704347b08518e9024fa1f840'; // Replace with your Client Secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect URI

app.use(cors());

app.get('/login', function(req, res) {
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

app.get('/callback', function(req, res) {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    } else {
      res.send({
        'error': 'invalid_token'
      });
    }
  });
});

app.listen(8888, () => {
  console.log('Server running on http://localhost:8888');
});
