'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const AccountController = require('./controllers/AccountControllers');


const router = new Router();
router.get('/', homeController.getApiInfo);

router.get('/account/lst', AccountController.search);

module.exports = router;
