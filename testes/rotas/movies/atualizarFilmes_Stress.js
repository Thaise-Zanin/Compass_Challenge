import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.stress,
    thresholds: testConfig.putMovies
}

export function setup() {
    const addMovie = {
        title: "O Enigma do Tempo",
        description: "Um cientista descobre um portal para o passado, mas cada viagem altera o futuro de forma imprevisível.",
        launchdate: "2025-06-15", 
        showtimes: ["16:30", "21:00"]
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
        launchdate: "2025-07-22",
        showtimes: ["10:00", "15:30"]
    };

    const putRes = baseRest.put(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`, updatedMovie);
    
    baseChecks.checkStatusCode(putRes, 200);
    baseChecks.checkResponseTime(putRes, 1000);
    baseChecks.checkResponseNotEmpty(putRes);
};

export function teardown(data) {
    const { movieId } = data;

    const deleteRes = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`);
    baseChecks.checkStatusCode(deleteRes, 200);
    console.log(`Filme deletado com id: ${movieId}`);
}


