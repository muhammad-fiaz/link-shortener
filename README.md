# 🚀 Link Shortener

A simple and fast link shortener built with **Hono.js**, **Bun**, and **Drizzle ORM**. Supports authentication, short URL creation, and seamless hosting on **Vercel**.

## ✨ Features
- 🔗 Shorten URLs with ease
- 🔑 Secure authentication using JWT
- 📁 Serve static files like `index.html`
- 🚀 Deployable on **Vercel** with `vercel.json`
- 📦 Uses **Bun** for fast execution

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Static)
- **Backend**: [Hono.js](https://hono.dev/) (powered by Bun)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: JSON Web Tokens (JWT)

## 📦 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/link-shortener.git
cd link-shortener
```

### 2️⃣ Install Dependencies
```sh
bun install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory:
```
DATABASE_URL=your_database_url
BASE_URL=your_base_url
ADMIN_USERNAME=admin
ADMIN_PASSWORD=securepassword123
JWT_SECRET=supersecretkey
```

### 4️⃣ Run the App in Development Mode
```sh
bun run dev
```

### 5️⃣ Build and Start for Production
```sh
bun run build
bun run start
```

## 🚀 Deploying on Vercel
```sh
bun run deploy
```


## 📜 License
This project is open-source and licensed under the **MIT License**.

