// 'use strict';

// module.exports = {
//   type: "content-api",
//   routes: [
//     {
//       method: 'POST',
//       path: '/tasks',  // The URL to access this route
//       handler: 'task.create',  // Points to the `create` method in the task controller
//       config: {
//         policies: [],  // Add any policies if needed
//         auth: false,
//       }
//     },
//     {
//       method: 'GET',
//       path: '/tasks',  // The URL to access this route
//       handler: 'task.find',  // Points to the `find` method in the task controller
//       config: {
//         policies: [],  // Add any policies if needed
//         auth: false,
//       }
//     }
//   ],
// };


'use strict';

module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'POST',
      path: '/tasks',
      handler: 'task.create',
      config: {
        policies: [],
        auth: false,
      }
    },
    {
      method: 'GET',
      path: '/tasks',
      handler: 'task.find',
      config: {
        policies: [],
        auth: false,
      }
    },
    {
      method: 'PUT',
      path: '/tasks/:id',  // URL with task ID
      handler: 'task.update',  // Points to the `update` method in the task controller
      config: {
        policies: [],
        auth: false,
      }
    },
    {
      method: 'DELETE',
      path: '/tasks/:id',  // URL with task ID
      handler: 'task.delete',  // Points to the `delete` method in the task controller
      config: {
        policies: [],
        auth: false,
      }
    }
  ],
};
