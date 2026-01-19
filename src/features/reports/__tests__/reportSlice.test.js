import { describe, it, expect, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import reportReducer, {
  toggleSelection,
  setSearchTerm,
  setSectorFilter,
  fetchReports,
  selectAllReports,
} from '../reportSlice';
import { mockReportsData } from '../../../test/mocks/reportsMock';
import * as api from '../../../services/api';

describe('reportSlice', () => {
  
  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reportReducer(undefined, { type: 'unknown' });
      
      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.status).toBe('idle');
      expect(state.error).toBe(null);
      expect(state.selectedIds).toEqual([]);
      expect(state.searchTerm).toBe('');
      expect(state.sectorFilter).toBe('All');
    });
  });

  describe('toggleSelection', () => {
    it('should add ID to selectedIds', () => {
      const initialState = {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
        selectedIds: [],
        searchTerm: '',
        sectorFilter: 'All',
      };
      
      const state = reportReducer(initialState, toggleSelection('r-101'));
      
      expect(state.selectedIds).toContain('r-101');
    });

    it('should remove ID from selectedIds', () => {
      const initialState = {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
        selectedIds: ['r-101'],
        searchTerm: '',
        sectorFilter: 'All',
      };
      
      const state = reportReducer(initialState, toggleSelection('r-101'));
      
      expect(state.selectedIds).not.toContain('r-101');
    });
  });

  describe('setSearchTerm', () => {
    it('should update searchTerm', () => {
      const initialState = {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
        selectedIds: [],
        searchTerm: '',
        sectorFilter: 'All',
      };
      
      const state = reportReducer(initialState, setSearchTerm('NVIDIA'));
      
      expect(state.searchTerm).toBe('NVIDIA');
    });
  });

  describe('setSectorFilter', () => {
    it('should update sectorFilter', () => {
      const initialState = {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
        selectedIds: [],
        searchTerm: '',
        sectorFilter: 'All',
      };
      
      const state = reportReducer(initialState, setSectorFilter('Technology'));
      
      expect(state.sectorFilter).toBe('Technology');
    });
  });

  describe('fetchReports async thunk', () => {
    it('should handle fulfilled state', async () => {
      const store = configureStore({
        reducer: { reports: reportReducer },
      });

      jest.spyOn(api, 'fetchReportsAPI').mockResolvedValue(mockReportsData);
      
      await store.dispatch(fetchReports());
      
      const state = store.getState().reports;
      
      expect(state.status).toBe('succeeded');
      expect(state.ids.length).toBe(mockReportsData.length);
    });

    it('should handle rejected state', async () => {
      const store = configureStore({
        reducer: { reports: reportReducer },
      });

      jest.spyOn(api, 'fetchReportsAPI').mockRejectedValue(
        new Error('Network error')
      );
      
      await store.dispatch(fetchReports());
      
      const state = store.getState().reports;
      
      expect(state.status).toBe('failed');
      expect(state.error).toBeTruthy();
    });
  });

  describe('Selectors', () => {
    it('should select all reports', () => {
      const store = configureStore({
        reducer: { reports: reportReducer },
      });
      
      store.dispatch({
        type: fetchReports.fulfilled.type,
        payload: mockReportsData,
      });
      
      const state = store.getState();
      const reports = selectAllReports(state);
      
      expect(reports.length).toBe(mockReportsData.length);
    });
  });
});