import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchReportsAPI } from '../../services/api';

export const reportsAdapter = createEntityAdapter({
  selectId: (report) => report.id,
});

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchReportsAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: reportsAdapter.getInitialState({
    status: 'idle',
    error: null,
    selectedIds: [],
    searchTerm: '',
    sectorFilter: 'All',
  }),
  reducers: {
    toggleSelection: (state, action) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      
      if (index > -1) {
        state.selectedIds.splice(index, 1);
      } else {
        state.selectedIds.push(id);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSectorFilter: (state, action) => {
      state.sectorFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        reportsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { 
  toggleSelection, 
  setSearchTerm, 
  setSectorFilter 
} = reportSlice.actions;

const selectReportsState = (state) => state.reports;

export const {
  selectAll: selectAllReports,
  selectById: selectReportById,
} = reportsAdapter.getSelectors(selectReportsState);

export default reportSlice.reducer;