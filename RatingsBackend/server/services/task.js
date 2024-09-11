'use strict';

/**
 *  service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::ratings.task', ({ strapi }) => ({
  /**
   * Create a new task.
   * @param {Object} data - The task data.
   * @returns {Object} The created task.
   */
  async createTask(data) {
    try {
      // Ensure data contains required fields
      const { customer, serviceprovider, task_description, start_date, end_date } = data;
      if (!customer || !serviceprovider || !task_description || !start_date || !end_date) {
        throw new Error('All fields are required.');
      }

      // Create and return the task
      return await strapi.entityService.create('api::task.task', {
        data: {
          customer,
          serviceprovider,
          task_description,
          start_date,
          end_date
        }
      });
    } catch (error) {
      // Handle errors
      strapi.log.error('Error creating task:', error);
      throw new Error('Error creating task: ' + error.message);
    }
  }
}));
