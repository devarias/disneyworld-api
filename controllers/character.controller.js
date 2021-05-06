const characters = require('../models/characters');
const shows = require('../models/shows');
const jwt = require('jsonwebtoken');

async function charList(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const result = await characters.findAll();
      const characterList = result.map(({ name, image }) => ({ name, image }));
      res.status(200).json(characterList);
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
        const char = await characters.findOne({
          where: { name: data.name },
        });
        if (char === null) {
          res.status(404).json({ message: 'Character does not found' });
        } else {
          res.status(200).json(char);
        }
      } catch (error) {
        console.error(error);
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
      try {
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
      } catch (error) {
        console.error(error);
      }
    }
  });
}
async function editChar(req, res) {
  jwt.verify(req.token, 'secretToken', async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const name = await req.params.name;
        const data = await req.body;
        const char = await characters.findOne({
          where: { name: data.name },
        });
        if (char === null) {
          res
            .status(404)
            .json({ message: `Character ${data.name} does not found` });
        } else {
          const check = validateShows(data.shows);
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
        console.error(error);
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
        console.error(error);
      }
    }
  });
}

module.exports = { charList, getOneChar, createChar, editChar, deleteChar };
