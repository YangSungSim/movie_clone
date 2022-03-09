const API_KEY = "354755a5a1563868a28241ef82a613e3";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title:string;
    overview:string;
}

export interface IGetMoviesResult {
    dates: {
        maximum:string;
        minimum:string;
    }
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results:number
}


export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    )
}



export const getTv = ({pageParam}:{pageParam:number})  => {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=`+pageParam+"").then(
        response => response.json()
    );
}
