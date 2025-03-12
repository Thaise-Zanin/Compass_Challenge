import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.stress,
    thresholds: testConfig.putMovies
}

export function handleSummary(data) {
    return {
        "PutMovies.html": htmlReport(data),
    };
}

export function setup() {
    const addMovie = {
        title: "O Enigma do Tempo",
        description: "Um cientista descobre um portal para o passado, mas cada viagem altera o futuro de forma imprevisível.",
        launchdate: "2025-03-27T00:39:33.512Z", 
        showtimes: [
            "2025-03-31T11:16:51.820Z",
            "2025-05-09T10:46:27.857Z"      
        ]
    }  

const createRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, addMovie);

sleep(3)

const getRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    baseChecks.checkStatusCode(getRes, 200);

    const movies = getRes.json();
    const createdMovie = movies.find(movie => movie.title === addMovie.title);

    if (!createdMovie) {
        throw new Error("Erro: Não foi possível encontrar o filme criado!");
    }

    return { movieId: createdMovie._id };
}

export default (data) => {
    const { movieId } = data;

    const updatedMovie = {
        title: "Aventura no Reino Encantado",
        description: "Um grupo de animais mágicos embarca em uma jornada para salvar seu reino das forças sombrias que ameaçam destruí-lo.",
        launchdate: "2025-04-10T04:23:12.266Z",
        showtimes: [
            "2025-04-09T04:00:03.162Z",
            "2025-03-31T16:36:54.532Z"
        ]
    };

    const putRes = baseRest.put(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`, updatedMovie);
    
    baseChecks.checkStatusCode(putRes, 201);
    baseChecks.checkResponseTime(putRes, 1000);
    baseChecks.checkResponseNotEmpty(putRes);
};

export function teardown(data) {
    const { movieId } = data;

    const deleteRes = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`);
    baseChecks.checkStatusCode(deleteRes, 200);
    console.log(`Filme deletado com id: ${movieId}`);
}


