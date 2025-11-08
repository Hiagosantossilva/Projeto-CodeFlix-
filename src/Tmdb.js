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

// 🔹 Definindo o objeto antes de exportar
const Tmdb = {
  async getHomeList() {
    return [
      { slug: 'principais', title: 'Principais', items: pageify(local.principais || []) },
      { slug: 'Javascript', title: 'Javascript', items: pageify(local.Javascript || []) },
      { slug: 'jogos', title: 'Jogos', items: pageify(local.jogos || []) }

    ];
  },

  async getMovieInfo(id) {
    const pool = allBuckets(local);
    const found = pool.find(item => String(item.id) === String(id));
    return found || null;
  }
};

// ✅ Exporta o objeto nomeado
export default Tmdb;
