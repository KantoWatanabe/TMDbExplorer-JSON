import fs from 'fs';
import path from 'path';

export function saveJson(filename: string, data: unknown) {
  const filepath = path.resolve(process.cwd(), 'docs/json', filename);
  const dir = path.dirname(filepath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, JSON.stringify(data));
  console.log(`✅ Saved ${filepath}`);
}
