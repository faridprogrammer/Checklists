const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createChecklist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    items: Joi.array().required()
  }),
};

const getChecklists = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().custom(objectId),
  }),
};

const updateChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChecklist: createChecklist,
  getChecklists: getChecklists,
  getChecklist: getChecklist,
  updateChecklist: updateChecklist,
  deleteChecklist: deleteChecklist,
};
