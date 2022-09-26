const router = require("express").Router();
const {
  getAllThought,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(addThought);
router.route("/:thoughtId").delete(removeThought);
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);
module.exports = router;
