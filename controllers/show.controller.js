const characters = require('../models/characters');
const shows = require('../models/shows');
const jwt = require('jsonwebtoken');

async function showList(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      /** Pending */
    }
  });
}
async function getOneShow(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        /** Pending */
      } catch (error) {
        console.error(error);
      }
    }
  });
}

async function createShow(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        /** Pending */
      } catch (error) {
        console.error(error);
      }
    }
  });
}
async function editShow(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        /** Pending */
      } catch (error) {
        console.error(error);
      }
    }
  });
}
async function deleteShow(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        /** Pending */
      } catch (error) {
        console.error(error);
      }
    }
  });
}

module.exports = { showList, getOneShow, createShow, editShow, deleteShow };
