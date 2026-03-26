# Portal Interno Empresa

Proyecto interno para centralizar el acceso a herramientas de la empresa.

## Stack
- Frontend: HTML + CSS + JavaScript (vanilla)
- Backend: Node.js + Express (ES Modules)
- Herramientas: nodemon, dotenv, cors

## Estructura
- `frontend/`: interfaz y logica del portal
- `backend/`: servidor Express + endpoints API

## Instalacion
1. Ir al backend:
   - `cd backend`
2. Instalar dependencias:
   - `npm install`
3. Crear archivo de entorno:
   - Copiar `.env.example` a `.env`
4. Levantar en desarrollo:
   - `npm run dev`

Abrir en navegador: `http://localhost:3000`

## Endpoints
- `GET /api/health`
- `GET /api/apps`
