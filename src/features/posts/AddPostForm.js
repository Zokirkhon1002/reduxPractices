import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "./users/userSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const handleClickSave = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const ctrlPlusEnter = (e) => {
    if (e.ctrlKey && e.keyCode === 13 && canSave) {
      handleClickSave();
    }
  };

  return (
    <div>
      <section className="postSection">
        <h2> Add a New Post</h2>
        <form className="postForm" onKeyDown={ctrlPlusEnter}>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            className="postInput"
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="postAuthor">Author</label>
          <select
            className="postSelect"
            id="postAuthor"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value=""></option>
            {usersOption}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea
            className="postTextare"
            id="postContent"
            name="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            disabled={!canSave}
            onClick={handleClickSave}
            className="postButton"
            type="button"
          >
            Save Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddPostForm;
