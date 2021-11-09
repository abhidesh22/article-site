//Model for Article
import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    content: [{
      type: String,
      required: false,
    }],
    username: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
