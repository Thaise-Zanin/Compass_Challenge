import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.soak;

const data = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});

// Função para criar filmes
export function setup() {
    let responseData = [];

    // Criar filmes
    data.forEach(movie => {
        console.log('Criando filme', movie);
        const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movie);
        baseChecks.checkStatusCode(res, 201);
    });

    // Faz um GET para pegar todos os filmes e retorna o ID do primeiro filme
    const urlRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    console.log('Status da requisição GET para todos os filmes:', urlRes.status);
    const movies = urlRes.json();

    // Verificar se a resposta contém filmes
    if (movies && movies.length > 0) {
        console.log('Filmes encontrados:', movies);
        // Verificar se o primeiro filme tem o campo _id
        if (movies[0]._id) {
            console.log('ID do primeiro filme:', movies[0]._id);
            responseData.push(movies[0]._id);
        } else {
            console.error('Primeiro filme não possui _id:', movies[0]);
        }
    } else {
        console.error('Nenhum filme encontrado na resposta:', movies);
    }

    return { responseData };
}

// Função para pegar um filme específico pelo ID
export default (data) => {
    // Verificar se há algum ID para buscar o filme
    if (data.responseData && data.responseData.length > 0) {
        const movieId = data.responseData[0]; // Usar o primeiro ID da resposta
        console.log('Buscando filme com ID:', movieId);

        const urlRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        console.log('Status da requisição GET por ID:', urlRes.status);
        console.log('Resposta do filme:', urlRes.json());

        baseChecks.checkStatusCode(urlRes, 200);
        baseChecks.checkResponseNotEmpty(urlRes);
    } else {
        console.error('Nenhum ID de filme encontrado para busca.');
    }
};
