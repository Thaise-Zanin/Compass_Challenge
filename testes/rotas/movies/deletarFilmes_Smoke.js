import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.smoke,
    thresholds: testConfig.deleteMovies
}

export function handleSummary(data) {
    return {
        "DeleteMovies.html": htmlReport(data),
    };
}

const data = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});


export default function () {
    let JSONmovies = randomItem(data); 
    console.log('Enviando requisição POST para criar filme:', JSONmovies);

    const postResponse = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, JSONmovies);
    console.log('Status da requisição POST:', postResponse.status);

    if (baseChecks.checkResponseNotEmpty(postResponse)) {
        baseChecks.checkResponseBody(postResponse, 'Cadastro do filme realizado com sucesso!');
    }

    const getAllResponse = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const movies = getAllResponse.json();

    const createdMovie = movies[movies.length - 1];
    const movieId = createdMovie._id;

    if (!movieId) {
        console.error('Erro: Não foi possível obter o ID do filme criado.');
        throw new Error('Falha ao recuperar o ID do filme.');
    }

    console.log(`ID do filme criado: ${movieId}`);


    console.log(`Tentando deletar filme com id: ${movieId}`);
    const deleteResponse = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`);

    if (deleteResponse.status === 404) {
        console.log(`Não foi possível encontrar filme com id: ${movieId} para deletar`);
    } else {
        baseChecks.checkStatusCode(deleteResponse, 200);
        baseChecks.checkResponseSize(deleteResponse, 5000);
        baseChecks.checkResponseTime(deleteResponse, 1000);
        console.log(`Filme com id: ${movieId} deletado com sucesso!`);
    }

    sleep(1);
}