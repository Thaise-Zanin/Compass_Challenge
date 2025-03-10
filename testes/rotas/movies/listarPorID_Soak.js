import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
//import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.soak,
    thresholds: testConfig.getMoviesID
}

export function setup() {

    const getRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    baseChecks.checkStatusCode(getRes, 200);

    const Movies = getRes.json();
    const createdMovieIds = Movies.slice().map(movie => movie._id);

    return { createdMovieIds };
}

export default function (data) {
    for (let movieId of data.createdMovieIds) {
        const urlRes = baseRest.get(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`);
    
        baseChecks.checkStatusCode(urlRes, 200);
        baseChecks.checkResponseSize(urlRes, 5000);
        baseChecks.checkResponseTime(urlRes, 1000);
        baseChecks.checkResponseNotEmpty(urlRes);
    
        console.log(`Filme encontrado com id: ${movieId}`);
    }
    
        sleep(1);
}
