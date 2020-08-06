import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
// 컴포넌트에서 액션을 디스패치하기 위해 useDispatch 함수를 가져온다.
import { postAdded } from './postsSlice'
// 액션 생성함수
import { nanoid } from '@reduxjs/toolkit'
// 무작위 ID 해시값을 생성하는 패키지

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 컴포넌트 내부에서만 공유하는 상태값은 리덕스 스토어 대신, useState()를 이용한다.

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      // postAdded 액션 객체를 생성할 때 payload 값을 전달한다. 
      dispatch(
        postAdded({
          id: nanoid(), // 무작위 ID 해시값 생성
          title,
          content
        })
      )
      setTitle('');
      setContent('');
      // 포스트 저장 후 입력필드를 비운다. 
    }
  }

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
