const axios = require('axios');

export const TMDB_API_KEY = '9636f0e0bb8c73fea7087a16c78597c1';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/original';
export const IMG_URL_SM = 'https://image.tmdb.org/t/p/w45';
export default {
    getMovie: (type, page = 1) => {
        return axios
            .get(`${BASE_URL}/movie/${type}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'zh-TW',
                    page: page,
                },
            })
            .then((res) => res.data.results)
            .catch((err) => console.error(err));
    },
    getMovieInfo: (movieid) => {
        return axios
            .get(`${BASE_URL}/movie/${movieid}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'zh-TW',
                },
            })
            .then((res) => res.data)
            .catch((err) => console.error(err));
    },
    getSearch: (query, page = 1) => {
        return axios
            .get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'zh-TW',
                    query: query,
                    page: page,
                },
            })
            .then((res) => res.data.results)
            .catch((err) => console.error(err));
    },
    getVideo: async (movieid) => {
        const res = (
            await axios.get(`${BASE_URL}/movie/${movieid}/videos`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'zh-TW',
                },
            })
        ).data;
        return res.results.length > 0
            ? res
            : (
                  await axios.get(`${BASE_URL}/movie/${movieid}/videos`, {
                      params: {
                          api_key: TMDB_API_KEY,
                          language: 'en-US',
                      },
                  })
              ).data;
    },
};
