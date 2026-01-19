import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import { ReportTable } from '../../reports/ReportTable';
import { createLoadedState } from '../../../test/mocks/reportsMock';

describe('ReportTable Component', () => {
  
  describe('Loading State', () => {
    it('should show loading spinner', () => {
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: {
            ids: [],
            entities: {},
            status: 'loading',
            error: null,
            selectedIds: [],
            searchTerm: '',
            sectorFilter: 'All',
          },
        },
      });
      
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should show error message', () => {
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: {
            ids: [],
            entities: {},
            status: 'failed',
            error: 'Network error',
            selectedIds: [],
            searchTerm: '',
            sectorFilter: 'All',
          },
        },
      });
      
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    it('should show retry button', () => {
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: {
            ids: [],
            entities: {},
            status: 'failed',
            error: 'Error',
            selectedIds: [],
            searchTerm: '',
            sectorFilter: 'All',
          },
        },
      });
      
      expect(screen.getByTestId('retry-button')).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('should render table with data', () => {
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: createLoadedState(),
        },
      });
      
      expect(screen.getByTestId('report-table')).toBeInTheDocument();
    });

    it('should display all reports', () => {
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: createLoadedState(),
        },
      });
      
      expect(screen.getByText('NVIDIA Corp')).toBeInTheDocument();
      expect(screen.getByText('Apple Inc')).toBeInTheDocument();
    });
  });

  describe('Row Selection', () => {
    it('should check checkbox when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: createLoadedState(),
        },
      });
      
      const checkbox = screen.getByTestId('checkbox-r-101');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
    });

    it('should uncheck checkbox when clicked again', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ReportTable />, {
        preloadedState: {
          reports: createLoadedState(),
        },
      });
      
      const checkbox = screen.getByTestId('checkbox-r-101');
      
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});