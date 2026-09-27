# Aster / P4E

Production-oriented React/Vite workspace application deployed to Netlify.

## Architecture

- React + Vite + React Router
- Netlify hosting and serverless functions
- Supabase Auth for production authentication and email verification
- Supabase Postgres + RLS for user-scoped workspace persistence
- Zoho SMTP for team invitation emails via a Netlify Function
- Pendo integration retained in the application

## Required production setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. In Supabase Authentication settings, configure the Site URL as `https://blossomss.in`.
4. Add `https://blossomss.in/verify-email` and `https://blossomss.in/reset-password` to the allowed redirect URLs.
5. Configure the production email provider/templates in Supabase Auth. The default Supabase mail service is intended for development and has rate limits; use a custom SMTP provider for production email volume.
6. In Netlify, add:
   `
7. Deploy with `npm run build`.

## Security

Never commit `.env`. Only public Supabase values belong in `VITE_*` variables. Never put SMTP credentials or service-role keys in frontend variables.

## Local development

```bash
npm install
npm run dev
```

Without Supabase variables, authentication is intentionally unavailable rather than falling back to insecure browser-stored passwords.
