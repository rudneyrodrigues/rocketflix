import axios from 'axios';

export const apiKey = 'api_key=3570f41307fa569bbb1e3aa8dd8bdca3';
export const apiUrlImg = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
})