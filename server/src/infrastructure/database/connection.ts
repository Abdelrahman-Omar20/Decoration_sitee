import fs from 'fs';
import path from 'path';

interface DbData {
  users: any[];
  videos: any[];
  categories: any[];
  services: any[];
  blogPosts: any[];
  contactMessages: any[];
  tags: any[];
}

const defaultData: DbData = {
  users: [],
  videos: [],
  categories: [],
  services: [],
  blogPosts: [],
  contactMessages: [],
  tags: [],
};

const dbPath = process.env.DATABASE_PATH || './data/database.json';

function ensureDbExists(): void {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
  }
}

export function readDb(): DbData {
  ensureDbExists();
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function writeDb(data: DbData): void {
  ensureDbExists();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function initializeDatabase(): void {
  ensureDbExists();
  console.log('Database initialized at:', dbPath);
}
