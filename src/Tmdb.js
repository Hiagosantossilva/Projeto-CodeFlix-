// 100% LOCAL — compatível com o formato TMDB
import local from './data/codeflix-local.json';

// Embala arrays no formato que a UI espera (items.results)
function pageify(results) {
  return {
    page: 1,
    total_pages: 1,
    total_results: results.length,
    results
  };
}

// Pool para getMovieInfo
const allBuckets = (db) => ([
  ...(db.principais || []),
  ...(db.python || [])
]);

export default {
  async getHomeList() {
    return [
      { slug: 'principais', title: 'Principais', items: pageify(local.principais || []) },
      { slug: 'python',     title: 'Python',     items: pageify(local.python || []) }
    ];
  },

  async getMovieInfo(id) {
    const pool = allBuckets(local);
    const found = pool.find(item => String(item.id) === String(id));
    return found || null;
  }
};
