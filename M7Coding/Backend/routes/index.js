const express = require("express");
const router = express.Router();
const formRoutes = require("./formRoutes");

router.use("/forms", formRoutes);

module.exports = router;