import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils';
import { ReportSummary } from '../../reports/ReportSummary';
import { createLoadedState } from "../../../test/mocks/reportsMock"
describe('ReportSummary Component', () => {
  
  describe('Rendering Logic', () => {
    it('should not render when nothing selected', () => {
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: createLoadedState(),
        },
      });
      
      expect(screen.queryByTestId('report-summary')).not.toBeInTheDocument();
    });

    it('should render when reports selected', () => {
      const state = createLoadedState();
      state.selectedIds = ['r-101'];
      
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: state,
        },
      });
      
      expect(screen.getByTestId('report-summary')).toBeInTheDocument();
    });
  });

  describe('Calculations', () => {
    it('should calculate total weight', () => {
      const state = createLoadedState();
      state.selectedIds = ['r-101']; // NVIDIA: 5.2%
      
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: state,
        },
      });
      
      const totalWeight = screen.getByTestId('total-weight');
      expect(totalWeight).toHaveTextContent('5.20%');
    });

    it('should calculate weighted average return', () => {
      const state = createLoadedState();
      state.selectedIds = ['r-101']; // NVIDIA: 12.4% return
      
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: state,
        },
      });
      
      const avgReturn = screen.getByTestId('weighted-avg-return');
      expect(avgReturn).toHaveTextContent('12.40%');
    });

    it('should format positive returns with + sign', () => {
      const state = createLoadedState();
      state.selectedIds = ['r-101'];
      
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: state,
        },
      });
      
      const avgReturn = screen.getByTestId('weighted-avg-return');
      expect(avgReturn.textContent).toContain('+');
    });

    it('should format negative returns without + sign', () => {
      const state = createLoadedState();
      state.selectedIds = ['r-102']; // Exxon: -2.1%
      
      renderWithProviders(<ReportSummary />, {
        preloadedState: {
          reports: state,
        },
      });
      
      const avgReturn = screen.getByTestId('weighted-avg-return');
      expect(avgReturn.textContent).toContain('-');
      expect(avgReturn.textContent).not.toContain('+');
    });
  });
});