const Pusher = require('pusher');

module.exports = function(req, res, next) {
// Pusher setup for live update
    const pusher = new Pusher({
        appId: '775254',
        key: 'b48dc9f2091a8e7665e9',
        secret: '2c9bbd22117b146fe968',
        cluster: 'us3',
        encrypted: true
    });

    pusher.trigger('project-x', 'update', {
        // TODO: REMOVE THE QUOTES
        id: req.user.id
    });
    return next();
};
