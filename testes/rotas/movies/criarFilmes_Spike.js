import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig} from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();
 
export const options = {
    ...testConfig.options.spike,
    thresholds: testConfig.postMovies
}
 
const data = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});
 
export function handleSummary(data) {
    return {
        "PostMovies.html": htmlReport(data),
    };
}
 
export default () => {
 
    let movieJson = randomItem(data);
    console.log('Enviando requisição POST para filme', movieJson);
 
    const urlRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movieJson);
    console.log(urlRes.status);
    baseChecks.checkStatusCode(urlRes, 201);
    baseChecks.checkResponseSize(urlRes, 5000); 
    baseChecks.checkResponseTime(urlRes, 1000);
    baseChecks.checkResponseNotEmpty(urlRes);

    let checkBody = baseChecks.checkResponseNotEmpty(urlRes)
    if (checkBody){
        baseChecks.checkResponseBody(urlRes, 'Cadastro do filme realizado com sucesso!');
    }
 
};
 
export function teardown() {
   
    const getMovies = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    baseChecks.checkStatusCode(getMovies, 200);
 
    const movies = getMovies.json();
    movies.forEach(movie => {
        const movieId = movie._id;
        const res = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        baseChecks.checkStatusCode(res, 200);

        let checkBody = baseChecks.checkResponseNotEmpty(res)
        if (checkBody){
        baseChecks.checkResponseBody(res, 'Filme deletado com sucesso!');
        }
        });
 
}

