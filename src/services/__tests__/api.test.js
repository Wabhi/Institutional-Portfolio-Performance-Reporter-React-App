import { describe, it, expect, jest } from '@jest/globals';
import { fetchReportsAPI, mockReportsData } from '../api';

describe('API Service', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchReportsAPI', () => {
    it('should return array of reports', async () => {
      // Mock Math.random to avoid random errors
      const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const data = await fetchReportsAPI();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      spy.mockRestore();
    });

    it('should return reports with correct structure', async () => {
      const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const data = await fetchReportsAPI();
      const report = data[0];
      
      expect(report).toHaveProperty('id');
      expect(report).toHaveProperty('name');
      expect(report).toHaveProperty('ticker');
      expect(report).toHaveProperty('sector');
      expect(report).toHaveProperty('weight');
      expect(report).toHaveProperty('quarterlyReturn');
      
      spy.mockRestore();
    });

    it('should return data matching mockReportsData', async () => {
      const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const data = await fetchReportsAPI();
      
      expect(data).toEqual(mockReportsData);
      
      spy.mockRestore();
    });

    it('should throw error when Math.random is less than 0.1', async () => {
      const spy = jest.spyOn(Math, 'random').mockReturnValue(0.05);
      
      await expect(fetchReportsAPI()).rejects.toThrow('Network error');
      
      spy.mockRestore();
    });
  });
});