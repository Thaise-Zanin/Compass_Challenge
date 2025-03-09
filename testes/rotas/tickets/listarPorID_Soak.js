import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.soak;

const data = new SharedArray('tickets', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
    return jsonData;
});

if (data.length === 0) {
    throw new Error('A lista de tickets está vazia. Verifique o arquivo tickets.json.');
}


export function setup() {
    const urlRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkResponseNotEmpty(urlRes);

    const tickets = urlRes.json();
    if (!tickets || tickets.length === 0) {
        throw new Error('Nenhum ticket encontrado no servidor.');
    }

    const ticketId = tickets[0]._id;
    console.log('Ticket ID para consulta:', ticketId);

    return { ticketId };
}

export default (data) => {
    let ticket = randomItem(data);
    console.log('Ticket selecionado:', ticket);

    if (!ticket || typeof ticket !== 'object') {
        throw new Error('Ticket selecionado é inválido ou está vazio');
    }

    const urlRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT + `/${data.ticketId}`);
    console.log('Status da resposta:', urlRes.status);

    if (urlRes.status === 200) {
        console.log('Corpo da resposta:', urlRes.json());
        baseChecks.checkResponseNotEmpty(urlRes);
    } else {
        console.error('Erro na requisição:', urlRes.error);
    }

    sleep(1);
};
