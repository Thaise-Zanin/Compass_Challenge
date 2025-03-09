import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.load;

const data = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});

//export function handleSummary(data) {
  //  return {
   //     "get_stress.html": htmlReport(data),
    //};
//}

export function setup() {
    // Criando filmes antes de fazer o GET
    data.forEach(movie => {
        console.log('Criando filme', movie);
        const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movie);
        baseChecks.checkStatusCode(res, 201);
    });
}

// Função para pegar todos os filmes
export default () => {
    // Requisição GET para todos os filmes
    const urlRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    console.log(urlRes.status);
    console.log(urlRes.json());
    baseChecks.checkStatusCode(urlRes, 200);
    baseChecks.checkResponseNotEmpty(urlRes);
};
