const shows = require('../models/shows');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN;

async function showList(req, res) {
  jwt.verify(req.token, TOKEN, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const query = await req.query;
      if (query.title || query.genre || query.release) {
        let showsList;
        if (query.title !== undefined) {
          showsList = await shows.findAll({
            where: { title: query.title },
          });
        } else if (query.genre !== undefined) {
          showsList = await shows.findAll({
            where: {
              genre: query.genre,
            },
          });
        } else if (query.release !== undefined) {
          showsList = await characters.findAll({
            order: ['release', query.release],
          });
        }
        if (showsList === null) {
          res.status(404).json({ message: 'No Shows found with that filter' });
          return;
        } else if (showsList !== null) {
          res.status(200).json(showsList);
        }
      } else {
        const result = await shows.findAll();
        const showResult = result.map(({ image, title, release }) => ({
          image,
          title,
          release,
        }));
        res.status(200).json(showResult);
      }
    }
  });
}
async function getOneShow(req, res, next) {
  jwt.verify(req.token, TOKEN, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const data = await req.params;
        const show = await shows.findOne({
          where: { id: +data.id },
        });
        if (show === null) {
          res.status(404).json({ message: 'Show does not found' });
        } else {
          res.status(200).json(show);
        }
      } catch (error) {
        next(err);
      }
    }
  });
}
async function createShow(req, res, next) {
  jwt.verify(req.token, TOKEN, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const data = await req.body;
        const char = await shows.findOne({
          where: { title: data.title },
        });
        if (char !== null) {
          res.status(409).json({ message: 'Show already exists' });
        } else {
          const newShow = await shows.create({
            title: data.title,
            characters: data.characters,
            image: data.image,
            release: data.release,
            score: data.score,
            genre: data.genre,
          });
          res
            .status(201)
            .json({ message: 'Show created successfully', data: newShow });
        }
      } catch (error) {
        next(err);
      }
    }
  });
}
async function editShow(req, res, next) {
  jwt.verify(req.token, TOKEN, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const id_ = await req.params.id;
        const data = await req.body;
        const char = await shows.findOne({
          where: { id: id_ },
        });
        if (char === null) {
          res.status(404).json({ message: `Show #${id_} does not found` });
          return;
        }
        const showUpdated = await shows.update(
          {
            title: data.title ? data.title : null,
            image: data.image ? data.image : null,
            characters: data.characters ? data.characters : null,
            release: data.release ? data.release : null,
            score: data.score ? data.score : null,
            genre: data.genre ? data.genre : null,
          },
          { where: { id: id_ } }
        );
        res.status(200).json({
          message: `Show #${id_} was updated`,
          data: showUpdated,
        });
      } catch (error) {
        next(err);
      }
    }
  });
}
async function deleteShow(req, res, next) {
  jwt.verify(req.token, TOKEN, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const data = await req.params;
        const show = await shows.findOne({
          where: { id: data.id },
        });
        if (show === null) {
          res.status(404).json({ message: `Show #${data.id} does not found` });
        } else {
          await characters.destroy({
            where: { id: data.id },
          });
          res.status(200).json({ message: `Show ${data.id} was deleted` });
        }
      } catch (error) {
        next(err);
      }
    }
  });
}

module.exports = { showList, getOneShow, createShow, editShow, deleteShow };
