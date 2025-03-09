import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.smoke;

const data = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});

//export function handleSummary(data) {
  //  return {
   //     "delete_carga.html": htmlReport(data),
    //};
//}

export default () => {

    let movieJson = randomItem(data);
    console.log('Enviando requisição POST para filme', movieJson);

    const urlRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movieJson);
    console.log(urlRes.status);
    baseChecks.checkStatusCode(urlRes, 201); 
    baseChecks.checkResponseNotEmpty(urlRes);
    baseChecks.checkResponseSize(urlRes, 5000);
    baseChecks.checkResponseTime(urlRes, 1000);
    
    let checkBody = baseChecks.checkResponseNotEmpty(urlRes)
    if (checkBody){
    baseChecks.checkResponseBody(urlRes, 'Cadastro do filme realizado com sucesso');
    }

};

export function teardown() {
    
    const getUsers = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);  // 
    baseChecks.checkStatusCode(getUsers, 200);

    const movies = getUsers.json();
    movies.forEach(movie => {
        const movieId = movie._id;
        const res = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        baseChecks.checkStatusCode(res, 200);
        let checkBody = baseChecks.checkResponseNotEmpty(res)
        if (checkBody){
        baseChecks.checkResponseBody(res, 'Delete do Filme realizado com sucesso');
        }
        });
}
