import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
      // state = state.concat(action.payload); 이렇게 하면 정상적으로 스토어에 저장이 되지 않는다. 
    }
  }
})

export default userSlice.reducer;

