export const testConfig = {
    environment: {
        hml: {
            cinema: "http://localhost:3000"
        }
    },

    options: {
        
        smoke: {
            setupTimeout: '4000s',
            vus: 5,
            duration: '30s',
        },

        load: {
            setupTimeout: '3000s',
            teardownTimeout: '4000s',
            stages: [
                { duration: '30s', target: 50 },
                { duration: '1m', target: 150 },
                { duration: '30s', target: 0 },
            ],
            
        },

        stress: {
            setupTimeout: '6000s',
            teardownTimeout: '6000s',
            stages: [
                { duration: '1m', target: 100 },
                { duration: '2m', target: 350 },
                { duration: '1m', target: 0 },
            ],
            
        },

        spike: {
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            stages: [
                { duration: '1m', target: 250 },
                { duration: '20s', target: 50 },
            ],
            
        },

        soak: {
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            stages: [
                { duration: '1m', target: 100 },
                { duration: '1m', target: 150 },
                { duration: '30s', target: 0 },
            ]
        }
    },
    thresholds: {
        http_req_duration: ['p(95)<400', 'avg<200'], 
        http_req_failed: ['rate<0.01'],             
        http_req_waiting: ['p(95)<300', 'avg<200'],  
        checks: ['rate>0.99']                    
    },
    postMovies: { 
        http_req_duration : ['p(95)<200', 'avg<200'],
        http_reqs: ['count>=100'] 
    },
    getMovies: { 
        http_req_duration: ['p(95)<100', 'avg<100'],
        http_reqs : ['count>=200'] // 
    },
    getMoviesID: {
        http_req_duration: ['p(95)<50', 'avg<50'],
        http_reqs : ['count>=300'] 
    },
    putMovies: { 
        http_req_duration: ['p(95)<300', 'avg<300'],
        http_reqs: ['count>=50'] 
    },
    deleteMovies: {
        http_req_duration: ['p(95)<400', 'avg<400'],
        http_reqs: ['count>=30'] 
    },
    PostTickets: { 
        http_req_duration: ['p(95)<300', 'avg<300'],
        http_reqs: ['count>=50']
    }
};

