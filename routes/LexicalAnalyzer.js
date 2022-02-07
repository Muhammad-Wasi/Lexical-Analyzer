const express = require('express');
const LexicalAnalyzer = require("../controllers/LexicalAnalyzer");
const router = express.Router();

router.get('/', LexicalAnalyzer.GetResult);

module.exports = router;