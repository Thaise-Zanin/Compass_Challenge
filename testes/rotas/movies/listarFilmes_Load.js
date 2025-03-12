import { BaseChecks, BaseRest, ENDPOINTS, testConfig} from '../../../support/base/baseTest.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = {
    ...testConfig.options.load,
    thresholds: testConfig.getMovies
}

export function handleSummary(data) {
    return {
        "GetMovies.html": htmlReport(data),
    };
}

export default () => {

    const updateRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);

    baseChecks.checkStatusCode(updateRes, 200);
    baseChecks.checkResponseTime(updateRes, 1000);
    baseChecks.checkResponseNotEmpty(updateRes);

}
