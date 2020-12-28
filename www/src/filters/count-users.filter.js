export default users => {
  if (!Array.isArray(users)) return users;
  return users.length;
};