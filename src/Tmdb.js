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
const allBuckets = (db) => (
  Object.values(db || {})
    .filter(Array.isArray)
    .flat()
);

// 🔹 Definindo o objeto antes de exportar
const Tmdb = {
  async getHomeList() {
    return Object.entries(local || {})
      .filter(([, value]) => Array.isArray(value))
      .map(([key, value]) => ({
        slug: key,
        title: key,
        items: pageify(value || [])
      }));
  },

  async getMovieInfo(id) {
    const pool = allBuckets(local);
    const found = pool.find(item => String(item.id) === String(id));
    return found || null;
  }
};

// ✅ Exporta o objeto nomeado
export default Tmdb;
