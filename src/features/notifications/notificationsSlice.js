import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { client } from '../../api/client';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    // thunkAPI object, getState, dispatch...
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    // 가장 최근에 받은 알림을 기준으로 새 알림 사항 요청
    const latestTimeStamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `fakeApi/notifications?since=${latestTimeStamp}`
    )
    return response.notifications;
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    allNotificationsRead: (state, action) => {
      // 모든 알림 읽음 처리
      state.forEach(notification => {
        notification.read = true;
      })
    }
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.forEach(notification => {
        notification.isNew = !notification.read;
      })
      // 기존 알림을 과거 알림으로 처리
      state.push(...action.payload);
      state.sort((a, b) => b.date.localeCompare(a.date));
      // 최근 알림이 가장 먼저 나타나도록 정렬
    }
  }
})

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = state => state.notifications;