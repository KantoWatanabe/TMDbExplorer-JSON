import 'dotenv/config';
import { generateBanners } from './jobs/generateBanners';
import { generateRecommends } from './jobs/generateRecommends';

async function runAll() {
  try {
    await Promise.all([
      generateBanners(),
      generateRecommends(),
    ]);
    console.log('✅ All JSON updated!');
  } catch (err) {
    console.error('❌ Update failed:', err);
    process.exit(1);
  }
}

runAll();
