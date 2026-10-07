<div align="center">
  <h1>Lockout - Official Website</h1>
  <p>The official landing page and distribution site for <strong>Lockout</strong>, an offline-first, open-source focus app for Android.</p>
  
  <p>
    <a href="https://lockout.app"><img src="https://img.shields.io/badge/Website-lockout.app-F43F5E?style=flat-square" alt="Website" /></a>
    <a href="https://github.com/shubGupta10/focus-app"><img src="https://img.shields.io/badge/Main_App_Repo-Android-3DDC84?style=flat-square&logo=android" alt="Android App" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" /></a>
  </p>
</div>

---

> **Note:** This repository contains the source code for the **Lockout Website**. If you are looking for the actual Android application source code, please visit the [Lockout Android Repo](https://github.com/shubGupta10/focus-app).

## 🚀 Overview

The Lockout website is built to be lightning-fast, privacy-respecting, and provides a direct, secure way to download the latest APK releases without relying on centralized app stores.

### Key Features
- **Dynamic Releases**: Integrates directly with the GitHub API to automatically serve the latest Android APK.
- **Static Generation**: Pre-rendered pages for maximum SEO performance and zero-layout-shift loading.
- **Editorial Design**: Clean, whitespace-heavy typography designed to communicate trust and transparency.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Lucide React & FontAwesome
- **Deployment**: [Vercel](https://vercel.com)

## 💻 Local Development

First, clone the repository and install the dependencies:

```bash
npm install
# or yarn install / pnpm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit `app/page.tsx`.

## 📁 Repository Structure

- `/app` - Next.js routing and core pages (Home, Download, Privacy, Transparency).
- `/components` - Reusable UI components (Hero, layout wrappers, dynamic version tags).
- `/lib` - Core logic, including the GitHub Release API fetcher (`github.ts`) and global config (`config.ts`).
- `/content` - Static data structures (like FAQ questions).

## 🤝 Contributing

Contributions are welcome! If you spot a typo, want to improve the design, or add a new language translation:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/improvement`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
