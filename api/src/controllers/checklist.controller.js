const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checklistService } = require('../services');

const createChecklist = catchAsync(async (req, res) => {
  const user = await checklistService.createChecklist(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getChecklists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await checklistService.queryChecklists(filter, options);
  res.send(result);
});

const getChecklist = catchAsync(async (req, res) => {
  const user = await checklistService.getChecklistById(req.params.checklistId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  res.send(user);
});

const updateChecklist = catchAsync(async (req, res) => {
  const user = await checklistService.updateChecklistById(req.params.checklistId, req.body);
  res.send(user);
});

const deleteChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteChecklistById(req.params.checklistId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChecklist,
  getChecklists,
  getChecklist,
  updateChecklist,
  deleteChecklist,
};
