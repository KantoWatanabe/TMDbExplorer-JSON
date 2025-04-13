import fs from 'fs';
import path from 'path';

export function saveJson(filename: string, data: unknown) {
  const filepath = path.resolve(process.cwd(), 'docs', filename);
  fs.writeFileSync(filepath, JSON.stringify(data));
  console.log(`✅ Saved ${filepath}`);
}
