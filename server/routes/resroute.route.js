// const resAPI = require('../api/restaurant.api')

'use strict';

const Joi = require('joi');
const resValidator = require('@validator/restaurant.validator');
// Never take constants here
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/restaurant.api')
            server.route([
                {
                    method: 'POST',
                    path: '/restaurant',
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                         validate: API.createRest.validate,
                        pre: API.createRest.pre,
                        handler: API.createRest.handler
                    }
                },

                {
                    method: 'GET',
                    path: '/restaurant/get',
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                        validate: API.getlistRest.validate,
                        pre: API.getlistRest.pre,
                        handler: API.getlistRest.handler
                    }
                },{
                    method: 'DELETE',
                    path: "/restaurant/delete/{id}",
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                        validate: API.deleteRest.validate,
                        pre: API.deleteRest.pre,
                        handler: API.deleteRest.handler
                    }
                },
                {
                    method: 'DELETE',
                    path: "/restaurant/deleteMenu/{id}",
                    config: {
                        // auth: 'auth',
                        // plugins:{
                        //     policies:['log.policy'],
                        // },
                        // tags: ['api', 'Restaurant'],
                        // description: 'Get Restaurant List',
                        // notes: 'Post  Restaurant List',
                        // validate: API.getWebsiteList.validate,
                        pre: API.deleteRestMenu.pre,
                        handler: API.deleteRestMenu.handler
                    }
                },
               
               
               
            ])
        },
        version: require('../../package.json').version,
        name : 'restaurant-routes'
    }
}

// const routes = [
//   {
//     method: "POST",
//     path: "/restaurant",
//     handler: resAPI.createRest
//   },
//   {method: "GET",
//     path: "/restaurant/get",
//     handler: resAPI.getlistRest},
//     {
//       method:"DELETE",
//       path: "/restaurant/delete/{id}",
//       handler: resAPI.deleteRest
//     },
//     {
//       method:"DELETE",
//       path: "/restaurant/deleteMenu/{id}",
//       handler: resAPI.deleteRestMenu
//     },{
//       method:"PUT",
//       path: "/restaurant/update/{id}",
//       handler: resAPI.updateRest
//     }
// ];

// module.exports = routes;
