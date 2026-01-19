import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import { SectorFilter } from '../../reports/SectotFilter';

describe('SectorFilter Component', () => {
  
  describe('Rendering', () => {
    it('should render all sector buttons', () => {
      renderWithProviders(<SectorFilter />);
      
      expect(screen.getByTestId('sector-all')).toBeInTheDocument();
      expect(screen.getByTestId('sector-technology')).toBeInTheDocument();
      expect(screen.getByTestId('sector-energy')).toBeInTheDocument();
      expect(screen.getByTestId('sector-healthcare')).toBeInTheDocument();
    });

    it('should have "All" selected by default', () => {
      renderWithProviders(<SectorFilter />);
      
      const allButton = screen.getByTestId('sector-all');
      expect(allButton).toHaveClass('bg-blue-600');
    });
  });

  describe('User Interaction', () => {
    it('should change filter when clicking sector', async () => {
      const user = userEvent.setup();
      const { store } = renderWithProviders(<SectorFilter />);
      
      const techButton = screen.getByTestId('sector-technology');
      await user.click(techButton);
      
      expect(store.getState().reports.sectorFilter).toBe('Technology');
    });

    it('should update visual state', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SectorFilter />);
      
      const techButton = screen.getByTestId('sector-technology');
      await user.click(techButton);
      
      expect(techButton).toHaveClass('bg-blue-600');
    });

    it('should switch between filters', async () => {
      const user = userEvent.setup();
      const { store } = renderWithProviders(<SectorFilter />);
      
      await user.click(screen.getByTestId('sector-technology'));
      expect(store.getState().reports.sectorFilter).toBe('Technology');
      
      await user.click(screen.getByTestId('sector-energy'));
      expect(store.getState().reports.sectorFilter).toBe('Energy');
    });
  });
});