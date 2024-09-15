const review = require("./review/schema.json")
const contentID = require("./ratings-content-id/schema.json")
const task = require("./task/schema.json")
const taskrating = require("./taskrating/schema.json")

module.exports = {
  review: {schema: review},
  "r-content-id": {schema: contentID},
  task:{schema: task},
  taskrating:{schema:taskrating},

}
