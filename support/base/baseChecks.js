import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'status code check': (r) => r.status === expectedStatus,
        })
    }

    checkResponseSize(response, maxSize) {
        check(response, {
            'Tamanho da resposta dentro do limite': (r) => r.body.length <= maxSize,
        });
    }

    checkResponseTime(response, maxTime) {
        check(response, {
            'Tempo de resposta dentro do esperado': (r) => r.timings.duration <= maxTime,
        });

    }

    checkResponseBody(response, expectedContent) {
        check(response, {
            "Verificação do corpo da resposta": (r) => r.body.includes(expectedContent),
        });
    }

    checkResponseNotEmpty(response) {
        check(response, {
            'Verificação para garantir que a resposta não está vazia': (r) => r.body.length > 0
        });
    }

    
}