import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all articles
// @route   GET /api/article
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

//@description     Fetch single Article
//@route           GET /api/article/:title
const getArticleByTitle = asyncHandler(async (req, res) => {
  const article = await Article.find({title: req.params.title});

  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }

//   res.json(article);
});

//@description     Create Article
//@route           POST /api/article/create
//@access          Private
const CreateArticle = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;
  let contentArray = content.split(';');
  if (!title || !name || !username) {
    res.status(400);
    res.json("Please Fill all the feilds");
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const article = new Article({ username, title, content: contentArray, name });

    const createdArticle = await article.save();

    res.status(201).json(createdArticle);
  }
});

//@description     Delete Article
//@route           DELETE /api/article/:title

const DeleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.find({title: req.params.title});

  if (article[0]) {
    await article[0].remove();
    res.json({ message: "Article Removed" });
  } else {
    res.status(404);
    res.json("Article Not Found");
    throw new Error("Article not Found");
  }
});

// @desc    Update an Article
// @route   PUT /api/article/:title

const UpdateArticle = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;

  const article = await Article.find({title: req.params.title});

  if (article[0]) {
    article[0].title = title;
    article[0].content = content;
    article[0].name = name;
    article[0].username = username;

    const updatedArticle = await article[0].save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    res.json("Article Not Found");
    throw new Error("Article not found");
  }
});

export { getArticleByTitle, getArticles, CreateArticle, DeleteArticle, UpdateArticle };
