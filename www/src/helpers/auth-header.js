export const authHeader = () => {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.data) {
    return { headers: { Authorization: 'Bearer ' + user.data.token } };
  } else {
    return {};
  }
};
