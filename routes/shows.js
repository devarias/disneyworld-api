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

router.get('/', verifyToken, showList);
router.get('/:id', verifyToken, getOneShow);
router.post('/', verifyToken, createShow);
router.put('/:id', verifyToken, editShow);
router.delete('/:id', verifyToken, deleteShow);

module.exports = router;
