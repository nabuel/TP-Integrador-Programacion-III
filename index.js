import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();
const PORT = environments.port;
