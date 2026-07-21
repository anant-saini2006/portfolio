# Anant Saini — Personal Portfolio

A fast, recruiter-friendly personal portfolio built with Next.js 15 (App Router), Tailwind CSS, and Framer Motion. 

This repository contains the completely static frontend codebase designed to deploy effortlessly to Vercel's free Hobby tier with zero configuration or environment variables.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding Your Content

Before pushing to production, ensure you have added the following assets to the `public/` directory:

1. **Résumé**: Place your PDF resume at `public/resume.pdf`
2. **Screenshots**: Place your project screenshots in `public/` and update the `<Image>` tags in `app/projects/[slug]/page.tsx`
3. **Open Graph Image**: Place your social sharing card image at `public/opengraph-image.png`
4. **Favicon**: Place your icon at `public/favicon.ico`

## Deployment

This project is built for **Vercel**. Simply connect your GitHub repository to a new Vercel project and it will deploy automatically.

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

No environment variables are required.

## Building Locally

To verify the production build locally:

```bash
npm run build
```
