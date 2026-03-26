import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../../frontend');

const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

const apps = [
  {
    name: 'Página web',
    description: 'Sitio principal de la empresa.',
    url: 'https://www.psolutions.tech/',
    category: 'Corporativo'
  },
  {
    name: 'Carga de horas',
    description: 'Registro interno de horas de trabajo.',
    url: 'https://www.psolutions.tech/cargaHoras/',
    category: 'Operaciones'
  },
  {
    name: 'Passbolt',
    description: 'Gestor de credenciales y accesos.',
    url: 'https://nextcloud.psolutions.tech/apps/files/files',
    category: 'Seguridad'
  },
  {
    name: 'Nextcloud',
    description: 'Panel de archivos y colaboración.',
    url: 'https://nextcloud.psolutions.tech/apps/dashboard/',
    category: 'Colaboración'
  },
  {
    name: 'Wekan',
    description: 'Tableros para gestión de tareas.',
    url: 'https://wekan.psolutions.tech/',
    category: 'Productividad'
  },
  {
    name: 'Zoho',
    description: 'Cuenta y seguridad de Zoho.',
    url: 'https://accounts.zoho.com/home#security/app_password',
    category: 'Correo'
  },
  {
    name: 'Zoho admin',
    description: 'Administración del correo corporativo.',
    url: 'https://mailadmin.zoho.com/cpanel/home.do#dashboard',
    category: 'Administración'
  }
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portal-interno-empresa', timestamp: new Date().toISOString() });
});

app.get('/api/apps', (_req, res) => {
  res.json(apps);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
