import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.stress;

const dataMovies = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});

//export function handleSummary(data) {
   // return {
  //      "put_pico.html": htmlReport(data),
 //   };
//}

export function setup() {
    const movie = randomItem(dataMovies);
    
    console.log('Criando filme', movie);
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movie)
    console.log(res.json())
    baseChecks.checkStatusCode(res, 201)
        
    let movieId = res.json()._id;
    
    return  { movieId, movie };
    
}

export default (data) => {
    let updatedMovie = {
        title: "O Enigma do Tempo",
        description: "Um cientista descobre um portal para o passado, mas cada viagem altera o futuro de forma imprevisível.",
        launchdate: "2025-06-15", 
        showtimes: ["16:30", "21:00"]
    };
    
    console.log('Atualizando filme com ID:', data.movieId, 'Novos dados:', updatedMovie);

    const urlRes = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${data.movieId}`, updatedMovie);
    console.log(urlRes.status);
    baseChecks.checkStatusCode(urlRes, 200); 
    baseChecks.checkResponseNotEmpty(urlRes)
    
    
};

