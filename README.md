## Live Demo

    https://ruizmier-examen-production.up.railway.app/login

## Technologies  Used

Frontend: Next.js (React) + TypeScript. 
Styles: Tailwind CSS. 
Backend: Next.js API routes. 
Database: PostgreSQL. 
ORM: Prisma. 
Authentication: JWT stored in cookies, HttpOnly, and hashing with bcryptjs.

## Config

First, clone the repository

    git clone https://github.com/nnicolasluna/Ruizmier-Examen.git
    cd Ruizmier-Examen

If deploying to a production environment, log in to the repository.

Install dependencies

    npm install

Configure environment variables (Local) (.env)

    DATABASE_URL="postgresql://postgres:password@localhost:5432/database_name?schema=public"
    JWT_SECRET=xxxxx

Configure environment variables on Deploy

Create a PostgreSQL instance and obtain its address.

    postgresql://postgres:password@localhost:5432/database_name?schema=public

Then, connect your database to the obtained address and paste it into your project's environment variables after adding it to GitHub.

    DATABASE_URL="postgresql://postgres:password@localhost:5432/database_name?schema=public"
    JWT_SECRET=xxxxx

Once configured, run Prisma to establish communication.

    npx prisma generate dev
    npx prisma migrate dev

Run the development local server:

    npm run dev


