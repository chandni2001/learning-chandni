// // // ./src/api/task/controllers/task.js

// // 'use strict';

// // module.exports = {
// //   async create(ctx) {
// //     const { customer, serviceprovider, task_description, start_date, end_date } = ctx.request.body;

// //     try {
// //       // Create the task
// //       const newTask = await strapi.entityService.create('plugin::ratings.task', {
// //         data: {
// //           customer,
// //           serviceprovider,
// //           task_description,
// //           start_date,
// //           end_date,
// //         },
// //       });

// //       ctx.send(newTask);
// //     } catch (err) {
// //       ctx.throw(500, err);
// //     }
// //   },
// // };


// 'use strict';

// module.exports = {
//   async create(ctx) {
//     const { customer, serviceprovider, task_description, start_date, end_date } = ctx.request.body;

//     try {
//       // Create the task
//       const newTask = await strapi.entityService.create('plugin::ratings.task', {
//         data: {
//           customer,
//           serviceprovider,
//           task_description,
//           start_date,
//           end_date,
//         },
//       });

//       ctx.send(newTask);
//     } catch (err) {
//       ctx.throw(500, err);
//     }
//   },

//   async find(ctx) {
//     try {
//       // Fetch all tasks
//       const tasks = await strapi.entityService.findMany('plugin::ratings.task');
//       ctx.send(tasks);
//     } catch (err) {
//       ctx.throw(500, err);
//     }
//   },
// };



'use strict';

module.exports = {
  async create(ctx) {
    const { customer, serviceprovider, task_description, start_date, end_date } = ctx.request.body;

    try {
      const newTask = await strapi.entityService.create('plugin::ratings.task', {
        data: {
          customer,
          serviceprovider,
          task_description,
          start_date,
          end_date,
        },
      });

      ctx.send(newTask);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    try {
      const tasks = await strapi.entityService.findMany('plugin::ratings.task');
      ctx.send(tasks);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { customer, serviceprovider, task_description, start_date, end_date } = ctx.request.body;

    try {
      const updatedTask = await strapi.entityService.update('plugin::ratings.task', id, {
        data: {
          customer,
          serviceprovider,
          task_description,
          start_date,
          end_date,
        },
      });

      ctx.send(updatedTask);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      await strapi.entityService.delete('plugin::ratings.task', id);
      ctx.send({ message: 'Task deleted successfully' });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
