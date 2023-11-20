const API_KEY = '0825ca464080e64e052f2be5813e7a7b';
const BASE_PATH = "https://api.themoviedb.org/3";
export const LIST_TYPE = [
    "nowPlaying",
    "popularMovies",
    "topRatedMovies",
    "upcomingMovies",
    "popularTvShows",
    "todayTvShows",
    "onTheAirTvShows",
    "topRatedTvShows",
];
export interface IMovie{
    backdrop_path:string
    id:number;
    overview:string;
    poster_path:string;
    title:string;
    name: string;
}
export interface IDetailMovie {
    id: number;
    overview: string;
    title?: string;
    original_title?: string;
    name?: string;
    vote_average: number;
    runtime: number;
    backdrop_path: string;
    poster_path: string;
    genres: IGenre[];
    release_date?: string;
    first_air_date?: string;
    tagline?: string;
}
export interface IGenre{
    id : number;
    name : string;
}
interface ISearch{
    adult: boolean;
    backdrop_path : string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average : number;
}
export interface IGetMoviesResult{
    dates : {
        maximum : string;
        minimum : string;
    }
    page :number;
    results: IMovie[];
    total_pages: number;
    total_results :number;

}
export interface IGetSearchResult{
    page: number;
    results: ISearch[];
    total_pages: number;
    total_results: number;
}

export function getNowMovies(){
    return fetch(
        `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
      );
}
export function getPopularMovies(){
    return fetch(
        `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
      );
}
export function getTopMovies(){
    return fetch(
        `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
      );
}
export function getUpMovies(){
    return fetch(
        `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
      );
}
// TvShows popular
export function getPopularTvShows() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`).then((response) =>
      response.json()
    );
}
// TvShows airing_today
export function getTodayTvShows() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`).then((response) =>
      response.json()
    );
}
// TvShows on_the_air
export function getOnTheAirTvShows() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko`).then((response) =>
      response.json()
    );
}
// TvShows top_rated
export function getTopTvShows() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then((response) =>
      response.json()
    );
}




export function getSearch(keyword:string){
    return fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}`
        ).then(
        (response) => response.json()
      );
}

// 모달데이터
export function getDetailData(requestUrl: string, movieId: number) {
    return fetch(`${BASE_PATH}/${requestUrl}/${movieId}?api_key=${API_KEY}&language=ko`).then(
      (response) => response.json()
    );
  }