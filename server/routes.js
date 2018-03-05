var controller = require('./controllers/main.controller');

module.exports = (app) => {
    app.post('/users', controller.create_user);

    app.post('/login', controller.login);

    app.get('/posts', controller.get_posts);
    app.post('/posts', controller.protected, controller.create_post);
}
