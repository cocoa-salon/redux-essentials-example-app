import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'


export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  // const existingPost = useSelector((state) => state.posts.find(post => post.id === postId));
  const existingPost = useSelector(state => selectPostById(state, postId))

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(existingPost.title);
  const [content, setContent] = useState(existingPost.content);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({
        id: postId,
        title,
        content
      }));
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}