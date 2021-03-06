// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted routed
  console.log("Request user object: ", req.headers);

  if (req.user) {
    return next();
  } else if (req.headers.user) { // This looks for a user key in the header object, which is assigned when the request is sent from our devices
    req.user = {id: req.headers.user};
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};
