export default async () => new Response(JSON.stringify({ ok: true, service: 'p4e', timestamp: new Date().toISOString() }), { headers: { 'content-type': 'application/json' } });
