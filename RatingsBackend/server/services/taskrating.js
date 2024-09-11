'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::ratings.taskrating', ({ strapi }) => ({
  async createTaskRating(data) {
    const { task, review } = data;

    // Ensure task and review are valid
    if (!task || !review) {
      throw new Error('Task ID and Review ID are required.');
    }

    // Create taskrating
    return await strapi.entityService.create('plugin::ratings.taskrating', {
      data: {
        task,
        review
      }
    });
  }
}));
