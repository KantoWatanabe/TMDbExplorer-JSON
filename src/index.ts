import 'dotenv/config';
import { fetchTrendingMovies } from './jobs/fetchTrendingMovies';

async function runAll() {
  try {
    await Promise.all([
      fetchTrendingMovies(),
    ]);
    console.log('✅ All JSON updated!');
  } catch (err) {
    console.error('❌ Update failed:', err);
    process.exit(1);
  }
}

runAll();
