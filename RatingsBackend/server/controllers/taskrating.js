'use strict';

module.exports = {
  async create(ctx) {
    const { task, review } = ctx.request.body;

    try {
      // Ensure task and review are provided
      if (!task || !review) {
        return ctx.badRequest('Task ID and Review ID are required.');
      }

      // Create the taskrating entry
      const newTaskRating = await strapi.entityService.create('plugin::ratings.taskrating', {
        data: {
          task,
          review
        },
      });

      ctx.send({ message: 'TaskRating created successfully', data: newTaskRating });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    const { id } = ctx.params;

    try {
      // Fetch taskrating details including associated task and review
      const taskRating = await strapi.entityService.findOne('plugin::ratings.taskrating', id, {
        populate: ['task', 'review']
      });

      if (!taskRating) {
        return ctx.notFound('TaskRating not found');
      }

      ctx.send(taskRating);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
