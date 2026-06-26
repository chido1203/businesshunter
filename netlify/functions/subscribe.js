const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email = '';
  try {
    const params = new URLSearchParams(event.body || '');
    email = (params.get('email') || '').trim();
  } catch (e) {
    console.error('Parse error:', e.message);
  }

  console.log('Email received:', email);

  if (!email) {
    return { statusCode: 302, headers: { Location: '/success.html' } };
  }

  const payload = JSON.stringify({
    email,
    reactivate_existing: true,
    send_welcome_email: true
  });

  try {
    const result = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.beehiiv.com',
        port: 443,
        path: '/v2/publications/pub_fbbb1dcd-9fe5-41ec-bef5-2255b7d8d5e3/subscriptions',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer GQ2W6E0aTqpAu0C4M7bYwswLUQsahb3lMl3N4qkRUqM85pgKlCXswfpOEKItjfrQ',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => {
          console.log('Beehiiv status:', res.statusCode);
          console.log('Beehiiv response:', body);
          resolve({ status: res.statusCode, body });
        });
      });

      req.on('error', (err) => {
        console.error('Request error:', err.message);
        reject(err);
      });

      req.write(payload);
      req.end();
    });

    console.log('Done. Status:', result.status);
  } catch (err) {
    console.error('Beehiiv call failed:', err.message);
  }

  return {
    statusCode: 302,
    headers: { Location: '/success.html' }
  };
};
