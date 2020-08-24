import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/userSlice';
import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  // 리듀서를 인자 내부에 전달하여 리덕스 스토어를 생성
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})
