const router = require("express").Router();
const {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
