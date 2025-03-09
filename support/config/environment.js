export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        },
        cinema: {
            url: "http://localhost:3000"
        }
    },

    options: {
        
        smoke: {
            setupTimeout: '4000s',
            vus: 5,
            duration: '30s',
            thresholds: {
                http_req_duration: ['p(95) < 1000'],
                http_req_failed: ['rate < 0.05'],
                checks: ['rate > 0.95']
            }
        },

        load: {
            setupTimeout: '3000s',
            teardownTimeout: '4000s',
            thresholds: {
                http_req_duration: ['p(95) < 1000'],
                http_req_failed: ['rate < 0.05'],
                checks: ['rate > 0.95']
            },
            stages: [
                { duration: '30s', target: 50 },
                { duration: '1m', target: 150 },
                { duration: '30s', target: 0 },
            ],
            
        },

        stress: {
            setupTimeout: '6000s',
            teardownTimeout: '6000s',
            thresholds: {
                http_req_duration: ['p(95) < 1000'],
                http_req_failed: ['rate < 0.05'],
                checks: ['rate > 0.95']
            },
            stages: [
                { duration: '1m', target: 100 },
                { duration: '2m', target: 350 },
                { duration: '1m', target: 0 },
            ],
            
        },

        spike: {
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            thresholds: {
                http_req_duration: ['p(95) < 1000'],
                http_req_failed: ['rate < 0.05'],
                checks: ['rate > 0.95']
            },
            stages: [
                { duration: '1m', target: 250 },
                { duration: '20s', target: 50 },
            ],
            
        },

        soak: {
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            thresholds: {
                http_req_duration: ['p(95) < 1000'],
                http_req_failed: ['rate < 0.05'],
                checks: ['rate > 0.95']
            },
            stages: [
                { duration: '1m', target: 100 },
                { duration: '1m', target: 150 },
                { duration: '30s', target: 0 },
            ]
        }
    }
}