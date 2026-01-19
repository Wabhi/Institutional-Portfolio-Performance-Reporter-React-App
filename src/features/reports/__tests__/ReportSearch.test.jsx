import { describe, it, expect, jest } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import { ReportSearch } from '../../reports/ReportSearch';

describe('ReportSearch Component', () => {
  
  describe('Rendering', () => {
    it('should render search input', () => {
      renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      expect(input).toBeInTheDocument();
    });

    it('should have placeholder text', () => {
      renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      expect(input).toHaveAttribute('placeholder');
    });

    it('should render with empty value', () => {
      renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      expect(input).toHaveValue('');
    });
  });

  describe('User Interaction', () => {
    it('should update input value when typing', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      await user.type(input, 'NVIDIA');
      
      expect(input).toHaveValue('NVIDIA');
    });

    it('should handle clearing input', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      
      await user.type(input, 'test');
      await user.clear(input);
      
      expect(input).toHaveValue('');
    });
  });

  describe('Debounce Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should not dispatch immediately when typing', async () => {
      const user = userEvent.setup({ delay: null });
      const { store } = renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      
      await user.type(input, 'NVIDIA');
      
      expect(store.getState().reports.searchTerm).toBe('');
    });

    it('should dispatch after 300ms delay', async () => {
      const user = userEvent.setup({ delay: null });
      const { store } = renderWithProviders(<ReportSearch />);
      
      const input = screen.getByTestId('search-input');
      
      await user.type(input, 'NVIDIA');
      
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        expect(store.getState().reports.searchTerm).toBe('NVIDIA');
      });
    });
  });
});