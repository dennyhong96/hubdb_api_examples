require("dotenv").config();
const axios = require("axios");

const API = `https://api.hubapi.com/cms/v3/hubdb/tables`;
const API_KEY = process.env.HS_API_KEY;
