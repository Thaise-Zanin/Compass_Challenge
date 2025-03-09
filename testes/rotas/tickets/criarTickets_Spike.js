import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
//import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.spike;

const data = new SharedArray('tickets', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
    return jsonData;
});

//export function handleSummary(data) {
  //  return {
   //     "post_stress.html": htmlReport(data),
    //};
//}

export default () => {
    let ticket = randomItem(data);
    console.log('Enviando requisição POST para filme: ', ticket);

    const urlRes = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, ticket);
    console.log('Mensagem recebida: ', urlRes.body);

    baseChecks.checkStatusCode(urlRes, 201);

    let checkBody = baseChecks.checkResponseNotEmpty(urlRes);
    if (checkBody) {
        const responseBody = JSON.parse(urlRes.body);
        if (!responseBody.movieId || !responseBody.userId || !responseBody.seatNumber || !responseBody._id) {
            throw new Error('Resposta do servidor não contém os campos esperados');
        }
        console.log('Ticket criado com sucesso:', responseBody);
    }

    sleep(1);
};
