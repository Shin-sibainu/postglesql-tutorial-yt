const router = require("express").Router();
const controller = require("./controllers");

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.addStudents);
router.delete("/:id", controller.removeStudent);
router.put("/:id", controller.updateStudents);

module.exports = router;
