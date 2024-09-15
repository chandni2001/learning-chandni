'use strict';

module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'POST',
      path: '/taskratings',
      handler: 'taskrating.create',
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/taskratings/:id',
      handler: 'taskrating.find',
      config: {
        policies: [],
        auth: false
      }
    }
  ],
};
