````markdown
# 🎬 Movie Search Application

A modern **React + TypeScript** web application that lets you search and explore movies using the **TMDb (The Movie Database) API**.  
Built with **Vite**, **Tailwind CSS**, and reusable components for a fast, responsive, and user-friendly experience.

---

## 🌐 Demo

![Movie Search Screenshot](https://res.cloudinary.com/dnanaysnp/image/upload/v1757754999/Movie-Search-Application_image_1_nwrlbv.png)

---

## ✨ Features

- 🔍 **Search movies** instantly by name (via TMDb API)
- 📖 **View details** such as posters, release dates, ratings, and descriptions
- 📱 **Responsive design** for desktop & mobile
- ⚡ **Fast build & dev setup** using Vite
- 🎨 **Beautiful UI** powered by Tailwind CSS
- 🛡️ **Type safety** with TypeScript

---

## 🛠️ Tech Stack

- **React** (frontend framework)
- **TypeScript** (type-safe development)
- **Vite** (blazing-fast dev & build tool)
- **Tailwind CSS** (styling)
- **TMDb API** (movie data source)

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (16+ recommended)
- npm or yarn

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/0xHuzaifa/Movie-Search-Application.git
cd Movie-Search-Application
```
````

Install dependencies:

```bash
npm install
# or
yarn install
```

### 🔑 Environment Variables

You need an API key from [TMDb](https://www.themoviedb.org/).

1. Create an account and get your **API key** from TMDb.
2. Create a `.env` file in the project root and add:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

### ▶️ Running Locally

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run serve
```

---

## 📂 Project Structure

```
Movie-Search-Application/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Pages (search, details, etc.)
│   ├── hooks/             # custom hooks
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 📸 Screenshots

- Movie Detail Page
  > ![Movie Search Screenshot](https://res.cloudinary.com/dnanaysnp/image/upload/v1757755004/Movie-Search-Application_image_5_m7udvk.png)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature XYZ'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 🙌 Acknowledgements

- [TMDb](https://www.themoviedb.org/) for providing the movie database & API
- [React](https://react.dev/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling

---

## 👤 Author

**Huzaifa Ahmed**

- GitHub: [0xHuzaifa](https://github.com/0xHuzaifa)
- LinkedIn: [@0xHuzaifa](https://www.linkedin.com/in/0xhuzaifa)
