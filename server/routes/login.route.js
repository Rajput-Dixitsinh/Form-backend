// const resAPI = require('../api/restaurant.api')

'use strict';

const Joi = require('joi');
// const resValidator = require('@validator/restaurant.validator');
// Never take constants here
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/auth.api')
            server.route([
                {
                    method: 'POST',
                    path: '/signup',
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                        // validate: API.createRest.validate,
                        pre: API.createUser.pre,
                        handler: API.createUser.handler
                    }
                },
                {
                    method: 'POST',
                    path: '/login',
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                        // validate: API.createRest.validate,
                        pre: API.loginUser.pre,
                        handler: API.loginUser.handler
                    }
                },
                {
                  method: 'GET',
                  path: '/logout',
                  config: {
                      pre: API.logout.pre,
                      handler: API.logout.handler
                  }
              }
            ])
        },
        version: require('../../package.json').version,
        name : 'auth-routes'
    }
}