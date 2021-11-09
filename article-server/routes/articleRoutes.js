// Define the article CRUD operation routes

import express from "express";
import {
  getArticleByTitle,
  getArticles,
  CreateArticle,
  DeleteArticle,
  UpdateArticle,
} from "../controllers/articleControllers.js";
const router = express.Router();

router.route("/").get(getArticles);
router
  .route("/:title")
  .get(getArticleByTitle)
  .delete(DeleteArticle)
  .put(UpdateArticle);
router.route("/create").post(CreateArticle);

export default router;