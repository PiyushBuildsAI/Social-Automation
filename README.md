This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Android APK

The Android build wraps the static Next.js export in Capacitor 6, so the app
runs entirely from bundled assets (no server or database on the phone).

```bash
bun install
bun run apk        # build static export, sync, compile and sign
```

Output: `dist/automate-v0.2.0.apk` plus a `.sha256` file. The release signing key
is kept outside the repo at `~/.android/automate-release.jks` (password in
`~/.android/automate-release-password`); keep both to publish future updates.

`bun run build:mobile-web` builds only the offline web bundle, `bun run cap:sync`
copies it into `android/`, and `bun run android` opens the project in Android
Studio.

The APK is a demo: it uses a bundled demo session, has no real login/API/SQLite,
and its notification feed is in-app only. Real push notifications require an FCM
(or web-push) backend.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
