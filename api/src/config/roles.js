const allRoles = {
  user: ['manageChecklists', 'getChecklists'],
  admin: ['getUsers', 'manageUsers', 'manageChecklists', 'getChecklists'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
