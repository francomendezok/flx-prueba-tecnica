import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers, createUser, deleteUser, updateUser } from '../api/crudActions' // CRUD con axios en un archivo separado //  

// todos los usuarios // 
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers()
  return users
})

// crear usuario //
export const createNewUser = createAsyncThunk('users/createUser', async (userData) => {
  const newUser = await createUser(userData)
  return newUser
})

// elimina a un usuario // 
export const deleteUserFromDB = createAsyncThunk('users/deleteUser', async (userID) => {
  await deleteUser(userID)
  return userID
})

// actualiza datos de un usuario //
export const updateUserFromDB = createAsyncThunk('users/updateUser', async ({ userID, userData }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUser(userID, userData)
      return updatedUser
    } catch (error) {
      return rejectWithValue(error.message) // en caso de error, reject // 
    }
  }
)



const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // Lista con filtros incluidos. Es la que consume la tabla // 
    allUsers: [],
    filter: null,
    loading: false,
    error: null,
  },
  reducers: {
    setFilterStatus(state, action) {
      state.filter = action.payload
      if (state.filter) {
        state.users = state.allUsers.filter((user) => user.status === state.filter)
      } else {
        state.users = state.allUsers // si no hay filtro muestra todos los usuarios // 
      }
    },
    setFilterName(state, action) {
      state.filter = action.payload
      if (state.filter) {
        state.users = state.allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(state.filter.toLowerCase()) ||
            user.lastname.toLowerCase().includes(state.filter.toLowerCase())
        ) // muestra los usuarios que incluyen cierto orden de letras, no necesariamente match exacto // 
      } else {
        state.users = state.allUsers
      }
    },
    setUsers(state, action) {
      if (action.payload) {
        state.users = action.payload
      } else {
        state.users = state.allUsers
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // accion para obtener usuarios // 
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false // con el custom hook no se usa el global loading de este slice, pero igualmente podria servir si el proyecto es mas grande // 
        state.allUsers = action.payload
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // accion para crear un usuario // 
      .addCase(createNewUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false
        // agregar usuario a ambas listas // 
        state.allUsers.push(action.payload)
        state.users.push(action.payload)
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // accion para eliminar un usuario // 
      .addCase(deleteUserFromDB.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUserFromDB.fulfilled, (state, action) => {
        state.loading = false
        const userId = action.payload
        // sacamos al usuario eliminado de las listas de usuarios // 
        state.allUsers = state.allUsers.filter(user => user.id !== userId)
        state.users = state.users.filter(user => user.id !== userId)
      })
      .addCase(deleteUserFromDB.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    .addCase(updateUserFromDB.fulfilled, (state, action) => {
      state.loading = false
      const updatedUser = action.payload
      // Reemplazar el usuario actualizado en ambas listas
      state.allUsers = state.allUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
      state.users = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    })
  },
})

export const { setFilterStatus, setFilterName, setUsers  } = usersSlice.actions
export default usersSlice.reducer
