const PENDO_PUBLIC_APP_ID = '6eea865f-e4e3-4bf3-87f8-15c4ac2af581';

const normalizeEmail = (email = '') => String(email || '').trim().toLowerCase();

const accountIdFromEmail = (email = '') => {
  const normalized = normalizeEmail(email);
  const domain = normalized.split('@')[1] || 'unknown';
  return (domain.split('.')[0] || 'unknown').trim();
};

const stableUuidFromEmail = async (email = '') => {
  const normalized = normalizeEmail(email);
  if (!normalized) return 'guest-user';

  const data = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(hashBuffer)).slice(0, 16);

  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
};

const ensurePendoLoader = () => {
  if (window.pendo) return;

  (function (p, e, n, d, o) {
    var v, w, x, y, z;
    o = p[d] = p[d] || {};
    o._q = o._q || [];
    v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track', 'trackAgent'];
    for (w = 0, x = v.length; w < x; ++w) {
      (function (m) {
        o[m] = o[m] || function () {
          o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
        };
      })(v[w]);
    }
    y = e.createElement(n);
    y.async = true;
    y.src = 'https://cdn.pendo.io/agent/static/' + PENDO_PUBLIC_APP_ID + '/pendo.js';
    z = e.getElementsByTagName(n)[0];
    if (z && z.parentNode) {
      z.parentNode.insertBefore(y, z);
    }
  })(window, document, 'script', 'pendo');
};

export const initializePendoForUser = async (user) => {
  if (!user || typeof window === 'undefined') return;

  const email = normalizeEmail(user.email || '');
  if (!email) return;

  ensurePendoLoader();

  const visitorId = await stableUuidFromEmail(email);
  const accountId = accountIdFromEmail(email);

  if (window.pendo && typeof window.pendo.initialize === 'function') {
    window.pendo.initialize({
      visitor: {
        id: visitorId,
        email,
        full_name: user.name || email,
      },
      account: {
        id: accountId,
        name: accountId,
      },
    });
  }
};
