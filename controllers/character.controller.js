const { Op } = require('sequelize');
const characters = require('../models/characters');
const shows = require('../models/shows');
const jwt = require('jsonwebtoken');

async function charList(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const query = await req.query;
      if (query.age || query.weight || query.shows) {
        let chars;
        if (query.age !== undefined) {
          chars = await characters.findAll({
            where: { age: query.age },
          });
        } else if (query.weight !== undefined) {
          chars = await characters.findAll({
            where: {
              weight: query.weight,
            },
          });
        } else if (query.shows !== undefined) {
          const showList = query.shows.map((s) => parseInt(s));
          chars = await characters.findAll({
            where: { name: data.name, shows: { [Op.contains]: showList } },
          });
        }
        if (chars === null) {
          res
            .status(404)
            .json({ message: 'No Character found with that filter' });
          return;
        } else if (chars !== null) {
          res.status(200).json(chars);
        }
      } else {
        const result = await characters.findAll();
        const characterList = result.map(({ name, image }) => ({
          name,
          image,
        }));
        res.status(200).json(characterList);
      }
    }
  });
}
async function getOneChar(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const data = await req.params;
        if ((await findChar(data.name)) === null) {
          res.status(404).json({ message: 'Character does not found' });
        } else {
          res.status(200).json(char);
        }
      } catch (error) {
        throw new Error(err);
      }
    }
  });
}
async function validateShows(showList) {
  for (let i = 0; i < showList.length; i++) {
    const check = await shows.findOne({ where: { id: showList[i] } });
    if (check === null) {
      return showList[i];
    }
  }
  return false;
}
async function createChar(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = await req.body;
      const char = await characters.findOne({
        where: { name: data.name },
      });
      if (char !== null) {
        res.status(409).json({ message: 'Character already exists' });
      } else {
        const check = await validateShows(data.shows);
        if (check) {
          res
            .status(404)
            .json({ message: `The show #${check} does not exist` });
          return;
        }
        const newChar = await characters.create({
          name: data.name,
          image: data.image,
          age: data.age,
          weight: data.weight,
          history: data.history,
          shows: data.shows,
        });
        res
          .status(201)
          .json({ message: 'Character created successfully', data: newChar });
      }
    }
  });
}
async function findChar(name) {
  const char = await characters.findOne({
    where: { name: name },
  });
  return char;
}
async function editChar(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const name = await req.params.name;
        const data = await req.body;
        if ((await findChar(data.name)) === null) {
          res
            .status(404)
            .json({ message: `Character ${data.name} does not found` });
        } else {
          const check = await validateShows(data.shows);
          if (check) {
            res
              .status(404)
              .json({ message: `The show #${check} does not exist` });
            return;
          }
          const charUpdated = await characters.update(
            {
              name: data.name ? data.name : null,
              image: data.image ? data.image : null,
              age: data.age ? data.age : null,
              weight: data.weight ? data.weight : null,
              history: data.history ? data.history : null,
              shows: data.shows ? data.shows : null,
            },
            { where: { name: name } }
          );
          res.status(200).json({
            message: `Character ${data.name} was updated`,
            data: charUpdated,
          });
        }
      } catch (error) {
        throw new Error(err);
      }
    }
  });
}
async function deleteChar(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const data = await req.params;
        const char = await characters.findOne({
          where: { name: data.name },
        });
        if (char === null) {
          res
            .status(404)
            .json({ message: `Character ${data.name} does not found` });
        } else {
          await characters.destroy({
            where: { name: data.name },
          });
          res
            .status(200)
            .json({ message: `Character ${data.name} was deleted` });
        }
      } catch (error) {
        throw new Error(err);
      }
    }
  });
}

module.exports = { charList, getOneChar, createChar, editChar, deleteChar };
