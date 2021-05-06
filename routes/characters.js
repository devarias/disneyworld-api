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

router.get('/', verifyToken, charList);
router.get('/:name', verifyToken, getOneChar);
router.post('/', verifyToken, createChar);
router.put('/:name', verifyToken, editChar);
router.delete('/:name', verifyToken, deleteChar);

module.exports = router;
