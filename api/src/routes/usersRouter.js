const {Router} = require('express');
const {getAllUsersHandler,getUserByIdHandler,postUserHandler,
        putUserHandler,deleteUserHandler} = require('../handlers/usersHandlers.js');

const usersRouter = Router();

usersRouter.get('/',getAllUsersHandler);

usersRouter.get('/:id',getUserByIdHandler);

usersRouter.post('/',postUserHandler);

usersRouter.put('/',putUserHandler);

usersRouter.delete('/',deleteUserHandler);

module.exports = usersRouter;
