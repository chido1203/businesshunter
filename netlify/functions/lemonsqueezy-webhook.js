const crypto = require('crypto');
const https = require('https');

const BEEHIIV_PUB_ID = 'pub_fbbb1dcd-9fe5-41ec-bef5-2255b7d8d5e3';
const BEEHIIV_API_KEY = 'GQ2W6E0aTqpAu0C4M7bYwswLUQsahb3lMl3N4qkRUqM85pgKlCXswfpOEKItjfrQ';

const GRANT_EVENTS = ['order_created', 'subscription_created', 'subscription_payment_success'];
const REVOKE_EVENTS = ['subscription_expired'];

function beehiivRequest(path, method, payload) {
  return new Promise((resolve, reject) => {
    const body = payload ? JSON.stringify(payload) : null;
    const req = https.request({
      hostname: 'api.beehiiv.com',
      port: 443,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function grantPro(email) {
  const upsert = await beehiivRequest(
    `/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
    'POST',
    { email, reactivate_existing: true, send_welcome_email: false }
  );
  console.log('Beehiiv upsert:', upsert.status, upsert.body);

  let sub;
  try { sub = JSON.parse(upsert.body)?.data; } catch (e) { /* noop */ }

  if (!sub?.id) {
    console.error('No subscription id returned by Beehiiv, cannot tag as pro:', upsert.body);
    return;
  }

  const tagged = await beehiivRequest(
    `/v2/publications/${BEEHIIV_PUB_ID}/subscriptions/${sub.id}/tags`,
    'POST',
    { tags: ['pro'] }
  );
  console.log('Beehiiv tag pro:', tagged.status, tagged.body);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const signature = event.headers['x-signature'] || event.headers['X-Signature'];
  const rawBody = event.body || '';

  if (!secret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not configured');
    return { statusCode: 500, body: 'Webhook not configured' };
  }
  if (!signature) {
    console.error('Missing X-Signature header');
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const digestBuf = Buffer.from(digest, 'utf8');
  const sigBuf = Buffer.from(signature, 'utf8');

  const validSignature = digestBuf.length === sigBuf.length && crypto.timingSafeEqual(digestBuf, sigBuf);
  if (!validSignature) {
    console.error('Invalid webhook signature');
    return { statusCode: 401, body: 'Invalid signature' };
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    console.error('Could not parse webhook body:', e.message);
    return { statusCode: 400, body: 'Bad payload' };
  }

  const eventName = payload?.meta?.event_name;
  const email = payload?.data?.attributes?.user_email;
  console.log('Lemon Squeezy webhook received:', eventName, email);

  if (!email) {
    console.error('No user_email in payload for event', eventName, JSON.stringify(payload).slice(0, 500));
    return { statusCode: 200, body: 'No email, ignored' };
  }

  try {
    if (GRANT_EVENTS.includes(eventName)) {
      await grantPro(email);
    } else if (REVOKE_EVENTS.includes(eventName)) {
      console.log(`ACTION NEEDED: remove "pro" tag manually in Beehiiv for ${email} — subscription expired (Beehiiv API has no tag-removal endpoint).`);
    } else {
      console.log('Event ignored (not relevant to Pro access):', eventName);
    }
  } catch (err) {
    console.error('Error processing webhook:', err.message);
  }

  return { statusCode: 200, body: 'OK' };
};
