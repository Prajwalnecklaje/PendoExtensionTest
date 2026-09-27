export default async () => new Response(JSON.stringify({ error: 'Email verification is handled by Supabase Auth in production.' }), { status: 410, headers: { 'content-type': 'application/json' } });
