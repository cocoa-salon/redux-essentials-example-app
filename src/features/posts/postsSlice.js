import { createSlice, nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
// createSlice를 이용하여 액션, 액션 생성 함수, 초기값, 리듀서를 모두 정의할 수 있다. 
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // 첫번째 인자는 액션 타입, 두번째 인자는 서버 요청에 따른 값을 페이로드로 삼는 함수(payload creator) 
  // 액션 생성 함수 
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
  const response = await client.post('/fakeApi/posts', { post: initialPost })
  return response.post;
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(userId, title, content) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
      // 요청이 시작되면 status를 loading으로 변경
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = state.posts.concat(action.payload)
      // 요청이 성공하면 status를 succeeded로 변경하고 state.posts에 가져온 값을 추가
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      // 요청이 실패하면 status를 failed로 변경하고 에러메시지를 error 상태에 저장한다. 
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    }
  }
})

export const { postAdded, reactionAdded, postUpdated } = postsSlice.actions;
// 필요한 곳에서 해당 액션을 디스패치하기 위해, 액션 생성 함수를 노출한다.
export default postsSlice.reducer;
// 리덕스 스토어를 생성하기 위해 리듀서를 노출한다.
export const selectAllPosts = state => state.posts.posts;
// 이떄 state는 posts가 아니라 루트 state

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId);

// memoized 함수를 리턴하기 위한 createSelector 메서드
export const selectPostsByUser = createSelector([
  selectAllPosts, (state, userId) => userId
  // input Selectors
], (posts, userId) => posts.filter(post => post.user === userId)
  // output Selector
);