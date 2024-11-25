import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// obtengo los usuarios con axios
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4000/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // lista filtrada
    allUsers: [], 
    filter: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setFilterStatus(state, action) {
      state.filter = action.payload // filter = 'activo' por ejemplo // 
      if (state.filter) {
        state.users = state.allUsers.filter((user) => user.status === state.filter)
      } else {
        state.users = state.allUsers
      }
    },
    setFilterName(state, action) {
      state.filter = action.payload
      if (state.filter) {
        state.users = state.allUsers.filter((user) => user.name.toLowerCase().includes(state.filter.toLowerCase()) || user.lastname.toLowerCase().includes(state.filter.toLowerCase()))
        console.log(state.users)
        console.log(state.filter)
        
      } else {
        state.users = state.allUsers 
      }
    },
    setUsers(state, action) {
      if (action.payload) {
        state.users = action.payload // usuarios filtrados // 
      } else {
        state.users = state.allUsers
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.allUsers = action.payload
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
});

export const { setFilterStatus, setUsers, setFilterName } = usersSlice.actions
export default usersSlice.reducer
