const axios = require('axios');

export const TMDB_API_KEY = '9636f0e0bb8c73fea7087a16c78597c1';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/w300';
export default {
    getPopularMovies: () => {
        return axios
            .get(`${BASE_URL}/movie/popular`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'zh-TW',
                    page: 1,
                },
            })
            .then((res) => res.data.results)
            .catch((err) => console.error(err));
    },
};
