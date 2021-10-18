const router = require("express").Router();
const todosRouter = require("./todos.routes");
const authRouter = require("./auth.routes");

// You put the next routes here 👇

router.use("/todos", todosRouter);
router.use("/auth", authRouter);

module.exports = router;
