const router = require("express").Router();
const {
  getAllThought,
  addThought,
  removeThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(addThought);
router.route("/:thoughtId").delete(removeThought);

module.exports = router;
