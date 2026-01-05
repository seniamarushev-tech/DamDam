export default {
  async fetch(request, env) {
    // Статика, собранная из apps/web/dist
    return env.ASSETS.fetch(request);
  },
};
