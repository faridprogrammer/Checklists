const httpStatus = require('http-status');
const { Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a checklist
 * @param {Object} checklistBody
 * @returns {Promise<Checklist>}
 */
const createChecklist = async (checklistBody) => {
  return Checklist.create(checklistBody);
};

/**
 * Query for checklists
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChecklists = async (filter, options) => {
  const checklists = await Checklist.paginate(filter, options);
  return checklists;
};

/**
 * Get checklist by id
 * @param {ObjectId} id
 * @returns {Promise<Checklist>}
 */
const getChecklistById = async (id) => {
  return Checklist.findById(id);
};

/**
 * Update checklist by id
 * @param {ObjectId} checklistId
 * @param {Object} updateBody
 * @returns {Promise<Checklist>}
 */
const updateChecklistById = async (checklistId, updateBody) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  Object.assign(checklist, updateBody);
  await checklist.save();
  return checklist;
};

/**
 * Delete checklist by id
 * @param {ObjectId} checklistId
 * @returns {Promise<Checklist>}
 */
const deleteChecklistById = async (checklistId) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  await checklist.remove();
  return checklist;
};

module.exports = {
  createChecklist,
  queryChecklists,
  getChecklistById,
  updateChecklistById,
  deleteChecklistById,
};
