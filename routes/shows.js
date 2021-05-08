const { Router } = require('express');
const { verifyToken } = require('../controllers/login.controller');
const {
  showList,
  getOneShow,
  createShow,
  editShow,
  deleteShow,
} = require('../controllers/show.controller');
const router = Router();

/** API Documentation */
/** Schema for Shows */
/**
 * @swagger
 * components:
 *  schemas:
 *    Show:
 *      type: object
 *      required:
 *        - title
 *        - image
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the Show
 *        title:
 *          type: string
 *          description: The show title
 *        characters:
 *          type: array
 *          items:
 *            type: string
 *          description: Characters of the show
 *        image:
 *          type: string
 *          description: URL of the show image
 *        release:
 *          type: date
 *          description: The release date of the show
 *        score:
 *          type: integer
 *          description: A score giving to the show
 *        genre:
 *          type: string
 *          description: The show genre
 *      example:
 *        id: 1
 *        title: The Prince & the Pauper
 *        characters: ["Mickey Mouse"]
 *        image: https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-12561-15merti_be04b344.jpeg
 *        release: 1990-11-16
 *        score: 5
 *        genre: Animation
 */
/**
 * @swagger
 * tags:
 *  name: 2. Shows
 *  description: Everything about the Disney World Shows
 */
/**
 * @swagger
 * /shows:
 *  get:
 *    summary: Get all the shows from Disney World
 *    tags: [2. Shows]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /shows/{id}:
 *  get:
 *    summary: pending
 *    tags: [2. Shows]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /shows:
 *  post:
 *    summary: pending
 *    tags: [2. Shows]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /shows/{id}:
 *  put:
 *    summary: pending
 *    tags: [2. Shows]
 *    responses:
 *      "200":
 *        description: pending
 */
/**
 * @swagger
 * /shows/{id}:
 *  delete:
 *    summary: pending
 *    tags: [2. Shows]
 *    responses:
 *      "200":
 *        description: pending
 */

router.get('/', verifyToken, showList);
router.get('/:id', verifyToken, getOneShow);
router.post('/', verifyToken, createShow);
router.put('/:id', verifyToken, editShow);
router.delete('/:id', verifyToken, deleteShow);

module.exports = router;
