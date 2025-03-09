import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.smoke;

const data = new SharedArray('tickets', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
    return jsonData;
});

export function setup() {
    
    let responseData = [];
    
    data.forEach(ticket => {
        console.log('Apagando ticket', ticket);
        const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, ticket)
        baseChecks.checkStatusCode(res, 201)
        
    })

    const urlRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    console.log(urlRes.json()[0]._id); 
    baseChecks.checkResponseNotEmpty(urlRes)
    responseData.push(urlRes.json()[0]._id)
   
    return { responseData }  
}

export default (data) => {
    const urlRes = baseRest.del(ENDPOINTS.TICKETS_ENDPOINT + `/${data.responseData}`);
    console.log(urlRes.status);
    baseChecks.checkStatusCode(urlRes, 200); 
    baseChecks.checkResponseNotEmpty(urlRes)
    baseChecks.checkResponseBody(urlRes, 'Ticket removido com sucesso');
};

