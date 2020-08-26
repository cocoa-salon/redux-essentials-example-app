import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// 컴포넌트에서 액션을 디스패치하기 위해 useDispatch 함수를 가져온다.
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/userSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  // 컴포넌트 내부에서만 공유하는 상태값은 리덕스 스토어 대신, useState()를 이용한다.
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  // const canSave = Boolean(userId) && Boolean(title) && Boolean(content);
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }


  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))


  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""> </option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}
