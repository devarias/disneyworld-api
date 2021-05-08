const { Router } = require('express');
const { login, register } = require('../controllers/login.controller');

const router = Router();

/** API Documentation */
/** Schema for User */
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: email address of the user
 *        password:
 *          type: string
 *          description: password of the user
 *      example:
 *        email: example@gmail.com
 *        password: password123
 */
/**
 * @swagger
 * tags:
 *  name: 1. Login and Register
 *  description: Login or Register an User
 */
/**
 * @swagger
 * /login/register:
 *  post:
 *    summary: Register an User
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to register
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    tags: [1. Login and Register]
 *    responses:
 *      "201":
 *        description: Successful register
 *      "400":
 *        description: Invalid email or password
 *      "409":
 *        description: Email already registered
 */
/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login an User an get the token
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to login
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    tags: [1. Login and Register]
 *    responses:
 *      "200":
 *        description: token
 *      "400":
 *        description: Invalid email or password
 *      "409":
 *        description: Email already registered
 */

router.post('/', login);
router.post('/register', register);

module.exports = router;
