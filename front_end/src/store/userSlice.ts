import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  firstName: string,
  lastName: string,
  email: string,
  active: boolean,
  followers: number,
  following: number
}

interface InitialState{
  user: UserState | null
}

const initialState: InitialState = {user: null};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    removeLoginUser: (state) => {
      state.user = null;
    }
  },
})

export const { setLoginUser, removeLoginUser} = counterSlice.actions;
export default counterSlice.reducer;