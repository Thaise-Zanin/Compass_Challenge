import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
//import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.soak,
    thresholds: testConfig.PostTickets
}

const data = new SharedArray('tickets', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
    return jsonData;
});

export default () => {
    let ticket = randomItem(data);
    console.log('Enviando requisição POST para ticket: ', ticket);

    const urlRes = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, ticket);
    baseChecks.checkStatusCode(urlRes, 201);
    baseChecks.checkResponseSize(urlRes, 5000); 
    baseChecks.checkResponseTime(urlRes, 1000);
    baseChecks.checkResponseNotEmpty(urlRes);

    let checkBody = baseChecks.checkResponseNotEmpty(urlRes)
    if (checkBody){
        baseChecks.checkResponseBody(urlRes, 'Ticket cadastrado com sucesso!');
    }
 
};

