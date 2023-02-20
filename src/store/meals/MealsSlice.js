import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../../lib/fetchApi";

export const mealsActionTypes = {
  GET_MEALS_SUCCESS: "GET_MEALS_SUCCESS",
  GET_MEALS_STARTED: "GET_MEALS_STARTED",
  GET_MEALS_FAILED: " GET_MEALS_FAILED",
};

const initialState = {
  meals: [],
  isLoading: false,
  error: "",
};



export const mealsSlice = createSlice({
  name: "meals",
  initialState,



  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state,action) =>{
      state.meals= action.payload
      state.isLoading =false
      state.error = ''
    })

    builder.addCase(getMeals.pending, (state) =>{
      state.isLoading = true
    })

    builder.addCase(getMeals.rejected, (state,action) =>{
      state.isLoading = false
      state.error = action.payload
    })
  // reducers: {
  //   getMealsStarted(state) {
  //     state.isLoading = true;
  //   },
  //   getMealsSuccess(state , action) {
  //     state.meals = action.payload;
  //     state.isLoading = false;
  //     state.error = "";
  //   },
  //   getMealsFailed(state, action) {
  //     state.isLoading = false;
  //     state.error= action.payload
  //   },
  // },
}});
export const mealActions = mealsSlice.actions



  

export const getMeals = createAsyncThunk('meals/getMeals', async(payload, {dispatch,rejectWithValue}) =>{
  try {
    dispatch(mealActions.getMealsStarted());
    const { data } = await fetchApi("foods");
    //   console.log(data);
    dispatch(mealActions.getMealsSuccess(data));
    return data
  } catch (error) {
    return rejectWithValue('something went wrong')
  }
})


// export const getMeals = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(mealActions.getMealsStarted());

//       const { data } = await fetchApi("foods");
//       //   console.log(data);
//       dispatch( mealActions.getMealsSuccess( data ));
//       return data
//     } catch (error) {
//       dispatch(mealActions.getMealsFailed);
//     }
//   };
// };

