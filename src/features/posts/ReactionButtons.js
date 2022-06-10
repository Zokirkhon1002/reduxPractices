import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";
import React from "react";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => (
    <button
      className="reactionButton"
      key={key}
      type="button"
      onClick={() =>
        dispatch(reactionAdded({ postId: post.id, reaction: key }))
      }
    >
      {value} {post.reactions[key]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
