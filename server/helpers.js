// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    name: request.name,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};
