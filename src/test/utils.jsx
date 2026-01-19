import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reportReducer from '../features/reports/reportSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { reports: reportReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function createMockStore(customState = {}) {
  return configureStore({
    reducer: { reports: reportReducer },
    preloadedState: {
      reports: {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
        selectedIds: [],
        searchTerm: '',
        sectorFilter: 'All',
        ...customState,
      },
    },
  });
}