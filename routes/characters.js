const { Router } = require('express');
const { verifyToken } = require('../controllers/login.controller');
const {
  charList,
  createChar,
  getOneChar,
  editChar,
  deleteChar,
} = require('../controllers/character.controller');
const router = Router();

/** API Documentation */
/** Schema for Character */
/**
 * @swagger
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      required:
 *        - name
 *        - image
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the Character
 *        image:
 *          type: string
 *          description: URL of the character image
 *        age:
 *          type: integer
 *          description: age of the Character
 *        weight:
 *          type: float
 *          description: weight of the Character
 *        history:
 *          type: string
 *          description: Short history about the Character
 *        shows:
 *          type: array
 *          items:
 *            type: integer
 *          description: Id of the Shows where the Character participated
 *      example:
 *        name: Mickey Mouse
 *        image: https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612.jpg
 *        age: 24
 *        weight: 52.5
 *        history: Mickey Mouse was created as a replacement for
 *          Oswald the Lucky Rabbit, an earlier cartoon character
 *          that was created by the Disney studio but owned by
 *          Universal Pictures.
 *        shows: [2, 4, 5]
 */
/**
 * @swagger
 * tags:
 *  name: 3. Characters
 *  description: Everything about the Disney World Characters
 */
/**
 * @swagger
 * /characters:
 *  get:
 *    summary: Get all the characters from Disney World
 *    tags: [3. Characters]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /characters/{name}:
 *  get:
 *    summary: pending
 *    tags: [3. Characters]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /characters:
 *  post:
 *    summary: pending
 *    tags: [3. Characters]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /characters/{name}:
 *  put:
 *    summary: pending
 *    tags: [3. Characters]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /characters/{name}:
 *  delete:
 *    summary: pending
 *    tags: [3. Characters]
 *    responses:
 *      "200":
 *        description: pending
 */

router.get('/', verifyToken, charList);
router.get('/:name', verifyToken, getOneChar);
router.post('/', verifyToken, createChar);
router.put('/:name', verifyToken, editChar);
router.delete('/:name', verifyToken, deleteChar);

module.exports = router;
