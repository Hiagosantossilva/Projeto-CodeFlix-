import local from './data/codeflix-local.json';

const categoryTitles = {
  principais: 'Principais projetos',
  Javascript: 'JavaScript',
  jogos: 'Jogos',
  'Profissional - Desenvolvimento Web': 'Desenvolvimento web profissional',
};

const Tmdb = {
  async getHomeList() {
    return Object.entries(local)
      .filter(([, value]) => Array.isArray(value))
      .map(([slug, projects]) => {
        // A project can appear in several categories, but only once per row.
        const seen = new Set();
        const results = projects.filter(item => {
          const key = `${item.title}-${item.poster_path}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return {
          slug,
          title: categoryTitles[slug] || slug,
          items: { page: 1, total_pages: 1, total_results: results.length, results },
        };
      });
  },
};

export default Tmdb;
