import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import "./posts.css";
import AddPostForm from "./AddPostForm";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const Posts = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((p) => (
    <article className="postArticle" key={p.id}>
      <h3>{p.title}</h3>
      <p className="postP">{p.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={p.userId} />
        <TimeAgo timeStamp={p.date} />
      </p>
      <ReactionButtons post={p} />
    </article>
  ));

  return (
    <div className="App">
      <main className="postMain">
        <AddPostForm />
        <section className="postSection">
          <h2>Posts</h2>
          {renderedPosts}
        </section>
      </main>
    </div>
  );
};

export default Posts;
