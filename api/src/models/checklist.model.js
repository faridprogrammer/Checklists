const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const checklistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
      }
    ]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
checklistSchema.plugin(toJSON);
checklistSchema.plugin(paginate);

checklistSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Checklist
 */
const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
