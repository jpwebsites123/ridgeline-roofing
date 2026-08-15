# Ridgeline Roofing Co. — Next.js Project

A production-ready Next.js 14 (App Router) + TypeScript + Tailwind CSS
conversion of the Ridgeline Roofing demo site. Visual design, copy, layout,
and every interaction are preserved from the original static build.

## Getting started

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

To build for production:

```bash
npm run build
npm start
```

## Admin Panel

There's a full admin dashboard at **`/admin`** — real Firebase
Authentication gating it, and Firestore behind the Leads, Reviews, and
Settings pages. It's not a mockup: once you connect a real Firebase
project (a few minutes, no code), it fully works, including estimate
requests submitted on the public site landing in the admin Leads inbox
in real time.

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → follow the prompts (Google Analytics is optional, skip it if you don't need it).
2. In your new project, click the **`</>`** (web app) icon on the project overview page to register a web app. Name it anything (e.g. "Ridgeline Website").
3. Firebase will show you a config object — you'll need the values from it in step 3 below.

### 2. Turn on Authentication and Firestore

1. In the left sidebar: **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save**.
2. Still under Authentication, go to the **Users** tab → **Add user** → enter the email/password you want to log into `/admin` with. (This is the account you'll actually sign in with — there's no public sign-up page, which is intentional.)
3. In the left sidebar: **Build → Firestore Database → Create database** → start in **production mode** → pick a region close to you → Enable.

### 3. Connect your project's credentials

1. Copy `.env.local.example` to a new file named `.env.local`.
2. Fill in the values from the Firebase config object you saw in step 1 (or find them anytime under **Project Settings → General → Your apps**).
3. Restart `npm run dev` if it was already running.

### 4. Set Firestore security rules

By default, "production mode" locks Firestore to deny all reads/writes,
which would block even the public Free Estimate form. In the Firebase
Console under **Firestore Database → Rules**, replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can submit a lead (the public estimate form) — but only
    // signed-in admins can read, update, or delete leads.
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    // Anyone can read published reviews (for a future public reviews
    // feed) — only signed-in admins can write.
    match /reviews/{reviewId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Only signed-in admins can read or write settings.
    match /settings/{docId} {
      allow read, write: if request.auth != null;
    }
    // Public site content managed from the admin panel — Team, Services,
    // Service Area, and the Cloudinary image map (Admin > Images) all
    // live under documents here (site/team, site/services, site/areas,
    // site/media). The public website needs to read these; only a
    // signed-in admin can write.
    match /site/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**. That's it — go to `/admin`, sign in with the user you
created in step 2, and everything (leads, reviews, settings, team,
services, service area, and images) is now live.

### 5. Set up Cloudinary (for uploading images from Admin → Images)

1. Create a free account at [cloudinary.com](https://cloudinary.com) if you don't have one.
2. On your Cloudinary dashboard, copy your **Cloud Name** (shown near the top).
3. Go to **Settings → Upload → Upload presets → Add upload preset**. Set **Signing Mode** to **Unsigned**, save it, and copy its **name**.
4. Add both values to `.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset_name
   ```
5. Restart `npm run dev`.

An **unsigned** preset is what makes this safe to call directly from the
browser — never put a Cloudinary API secret in a `NEXT_PUBLIC_` variable
or anywhere in the client code.

### What's real vs. what's a placeholder right now

- **Real and fully wired:** Firebase Auth login/logout; the Leads inbox (fed live by the public Free Estimate form); the Reviews manager (add/edit/delete); Settings (company info + password change); **Team** (add/edit/delete/reorder, live on the public About page); **Services** (add/edit/delete/reorder, live on the public Services grid); and **Images** (Admin → Images — upload via Cloudinary, saved to Firestore, and the hero, category/service photos, team photos, and project photos on the public site all use the uploaded version automatically once set).
- **Read-only for now:** **Projects** and **Service Area** display the site's current data but don't yet save edits back to Firestore — those are the natural next step, following the same pattern already used for Team and Services.

## ⚠️ Important — please read before you run this

I built this project in a sandboxed environment **with no internet access**
(outbound requests to the npm registry were blocked). That means I could not
actually run `npm install`, `npm run dev`, or `npm run build` here to confirm
they succeed — I want to be upfront about that rather than claim a
verification I didn't do.

What I *did* do to de-risk this as much as possible without network access:

- Used a real HTML parser (not hand-typing or naive find/replace) to convert
  every page of the original site into JSX, so markup structure, attributes,
  and text content were transformed programmatically and consistently rather
  than retyped by hand.
- Ran the entire `app/` and `components/` tree through the TypeScript
  compiler (using stub type declarations for `next`/`react`, since those
  packages aren't installed here) and resolved every error down to zero —
  this catches JSX structural mistakes, mismatched tags, bad imports, and
  most typos, though it can't catch issues that only show up with the real
  `next`/`react` type definitions or at actual build/runtime.
- Cross-checked every internal link and hash anchor (`/about`, `/services`,
  `/services#svc-metal`, `/#materials`, `/contact#estimate`, etc.) against
  the actual `id` attributes and routes in the project to confirm nothing
  points at a dead destination.
- Used dependency versions (Next 14.2.5, React 18.3.1, TypeScript 5.5.3,
  Tailwind 3.4.4) that are a known-compatible, widely-used combination.

**Please run `npm install` and `npm run build` yourself as the real
verification step**, and let me know if anything comes up — dependency
resolution issues are the most likely category of problem I couldn't rule
out from here.

## Project structure

```
app/
  layout.tsx          Root layout — fonts (next/font/google), metadata,
                       JSON-LD, and the shared Header/EstimateSection/
                       Footer/MobileBar/ScrollFx that render on every page
  globals.css          The full design system (ported 1:1 from the original
                       CSS, fonts swapped to next/font variables)
  page.tsx             Home page
  about/page.tsx
  services/page.tsx
  projects/page.tsx    Renders <ProjectsClient /> for the filter + modal
  reviews/page.tsx
  contact/page.tsx     Renders <ContactForm />

components/
  Header.tsx            Sticky nav, scroll state, mobile menu (client)
  Footer.tsx             (server)
  MobileBar.tsx           Sticky mobile Call/Estimate bar (server)
  EstimateSection.tsx    Shared free-estimate form, rendered on every
                         route via layout.tsx — matches the original
                         site's behaviour where every "Get My Free
                         Estimate" CTA lands on the same shared form
  ScrollFx.tsx            Reveal-on-scroll + counter animations (client,
                         re-initializes on route change)
  BeforeAfterSlider.tsx  Draggable before/after comparison (client)
  RoofVisualizer.tsx      Interactive roof-color swatch picker (client)
  FaqAccordion.tsx        FAQ accordion (client)
  ProjectsClient.tsx      Project filter, grid, and case-study modal (client)
  ContactForm.tsx         Short contact message form (client)
  sections/               Static, mostly-presentational home page sections
                         (Hero, TrustBar, Intro, Services, WhyChooseUs,
                         ProjectsTeaser, Process, Materials, ReviewsTeaser,
                         Warranty, Financing, Emergency, ServiceArea, FinalCta)

lib/
  projects-data.ts       Typed project/case-study data used by the
                         homepage teaser and the full Projects page
```

## Design decisions worth knowing about

- **Styling stays in `globals.css`, not Tailwind utility classes.** The
  brief was explicit about not redesigning the site, and the original
  design uses a large custom CSS system (CSS custom properties, specific
  grid layouts, custom animations). Rewriting all of that into Tailwind
  utilities pixel-for-pixel would have meant re-deriving hundreds of values
  by hand — high effort for real risk of visual drift, with no benefit to
  you. Tailwind is fully installed and configured per your requirements
  (`tailwind.config.ts`, `postcss.config.mjs`, `@tailwind` directives in
  `globals.css`) and ready to use for any new components you build going
  forward; the existing design just isn't rewritten into it.
- **Internal navigation uses plain `<a>` tags, not `next/link`.** This
  guarantees correct navigation with zero risk of misconfiguration. The
  trade-off is that internal links do a full page navigation rather than
  Next's client-side transition. Swapping `<a href="/about">` for
  `<Link href="/about">` throughout is a safe, incremental follow-up if you
  want prefetching/faster transitions later.
- **All imagery is local, hand-built SVG illustration — not photography.**
  Earlier drafts of this project used external stock-photo URLs, which
  turned out to be unreliable (some didn't load at all, and I had no way to
  visually verify them from this environment). Rather than risk that again,
  every image on the site is now a custom SVG illustration in
  `public/images/`, generated to match the brand palette (charcoal/copper/
  cream) and referenced with plain local paths like `src="/images/category-metal.svg"`.
  Nothing depends on a third-party server, so nothing can go down or 404.
  The tradeoff is real: these are stylized line-art scenes with an icon
  badge per category, not photos of actual roofs or crews. Swapping in real
  photography later is a straightforward `src` swap — see the file list
  below for what each one represents.
- **The Free Estimate form is shared across every page** (rendered once in
  `layout.tsx`), matching the original design where the same form/anchor
  (`#estimate`) is always the destination of every "Get My Free Estimate"
  CTA regardless of which page it's clicked from.

## Images — what's in `public/images/` and where it's used

Real photos are now used for 9 of the 10 category slots. Two are still
placeholder SVG illustrations because no source photo covers them yet
(see the note below the table).

| File | Represents | Used for |
|---|---|---|
| `hero.jpg` | Crew mid tear-off, residential roof | Homepage hero background |
| `category-replacement.jpg` | Full tear-off / re-roof in progress | Replacement service, Materials, before/after "before", final CTA background |
| `category-aftercrew.jpg` | Full crew lineup in front of a finished house | "After" shots, Intro section, Why Choose Us |
| `category-repair.jpg` | Close-up shingle repair with a pry bar | Repair service, before/after |
| `category-emergency.jpg` | Storm-damaged roof under a blue tarp | Emergency service, before/after |
| `category-inspection.jpg` | Inspector kneeling on a shingle roof with a clipboard | Inspection service, About page, Why Choose Us |
| `category-metal.jpg` | Standing-seam metal roof installation | Metal roofing service, Materials, before/after |
| `category-flat.jpg` | TPO membrane being welded/rolled | Flat roofing service, Materials, before/after |
| `category-commercial.jpg` | Wide commercial rooftop with HVAC units | Commercial service, Materials |
| `category-gutters.svg` | *(still an illustration)* | Gutters service — no gutter photo was supplied yet |
| `team-1.svg` – `team-4.svg` | *(still illustrations)* | About page team grid — no individual headshots supplied yet |

**⚠️ Worth checking before this goes live:** the supplied photos have
**"Summit Roofing"** visibly embroidered on the crew's shirts and caps,
while the site is branded **Ridgeline Roofing Co.** That's a real
brand-name mismatch a site visitor could notice on close inspection. Worth
either swapping in un-branded photos, photos of the actual crew, or
renaming the site to match — just flagging it rather than letting it slide
through unnoticed.

Each category photo is reused wherever that category appears across the
site (services grid, Materials, before/after slider, project gallery),
same as before — so replacing one file updates it everywhere that category
shows up.

## What's still placeholder content

Flagged in the UI itself (small "Demo content" / asterisk notes) and listed
here for convenience — replace before this goes live for a real client:

- Company name, phone number, email, address
- Stats in the intro section and About page
- All customer reviews
- Service area cities and the map illustration
- Project gallery locations and case-study details (`lib/projects-data.ts`)
- Financing details
- `category-gutters.svg` and the 4 team avatars — still illustrations, no source photos supplied for these yet
- The **"Summit Roofing" branding visible on the crew photos** — see the callout above

## Admin image manager (Cloudinary)

The admin dashboard includes **Admin > Images**. It lets an authenticated admin replace the hero, service/category, team, and project images without editing code. Uploaded image URLs are saved in Firestore at `site/media`, and the public website falls back to the original `/public/images` files until a custom image is uploaded.

Setup steps (Cloudinary account, upload preset, environment variables, and the Firestore rule this needs) are covered together with the rest of the Firebase setup above — see **step 5** and the security rules block.
