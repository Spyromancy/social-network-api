const { Thought, User } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find({}) /* populate reacitons? */
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      /* populate? */
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    /* go throught the thoughts array
    delete each item individually*/
    User.findOne({ _id: params.id }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      Thought.deleteMany({ username: dbUserData.username }).then((results) =>
        console.log(results)
      );
      res.json(dbUserData);
    });

    User.findOneAndDelete({ _id: params.id })
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        return Thought.deleteMany({ username: deletedUser.username });
      })
      .then(() => res.json({ message: "User has been deleted." }))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
