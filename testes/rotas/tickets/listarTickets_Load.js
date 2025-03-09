import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.load;


export default () => {
    const urlRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Status da resposta:', urlRes.status);
    
    if (urlRes.status === 200) {
        console.log('Corpo da resposta:', urlRes.json());
        baseChecks.checkResponseNotEmpty(urlRes);
    } else {
        console.error('Erro na requisição:', urlRes.error);
    }
    
    sleep(1);
};