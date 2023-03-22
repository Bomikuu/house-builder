import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchSpecifications, createSpecification as createSpecificationAPI, updateSpecification as updateSpecificationAPI, deleteSpecification as deleteSpecificationAPI } from '../api/specificationsAPI';
import { Specification } from '../types/specification';

interface SpecificationsState {
  list: Specification[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecificationsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchSpecificationsAsync = createAsyncThunk(
  'specifications/fetchSpecifications',
  async () => {
    const response = await fetchSpecifications();
    return response.data;
  }
);

export const createSpecificationAsync = createAsyncThunk(
  'specifications/createSpecification',
  async (specification: Specification) => {
    const response = await createSpecificationAPI(specification);
    return response.data;
  }
);

export const updateSpecificationAsync = createAsyncThunk(
  'specifications/updateSpecification',
  async (specification: Specification) => {
    const response = await updateSpecificationAPI(specification);
    return response.data;
  }
);

export const deleteSpecificationAsync = createAsyncThunk(
  'specifications/deleteSpecification',
  async (id: number) => {
    await deleteSpecificationAPI(id);
    return id;
  }
);

export const specificationsSlice = createSlice({
  name: 'specifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecifications.fulfilled, (state, action: PayloadAction<Specification[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpecifications.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createSpecificationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSpecificationAsync.fulfilled, (state, action: PayloadAction<Specification>) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(createSpecificationAsync.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateSpecificationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSpecificationAsync.fulfilled, (state, action: PayloadAction<Specification>) => {
        const index = state.list.findIndex((spec) => spec.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSpecificationAsync.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteSpecificationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSpecificationAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((spec) => spec.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSpecificationAsync.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default specificationsSlice.reducer;