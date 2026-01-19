export const mockReportsData = [
  {
    id: "r-101",
    name: "NVIDIA Corp",
    ticker: "NVDA",
    sector: "Technology",
    weight: 5.2,
    quarterlyReturn: 12.4
  },
  {
    id: "r-102",
    name: "Exxon Mobil",
    ticker: "XOM",
    sector: "Energy",
    weight: 3.8,
    quarterlyReturn: -2.1
  },
  {
    id: "r-103",
    name: "Apple Inc",
    ticker: "AAPL",
    sector: "Technology",
    weight: 7.5,
    quarterlyReturn: 8.3
  },
  {
    id: "r-104",
    name: "Pfizer Inc",
    ticker: "PFE",
    sector: "Healthcare",
    weight: 4.1,
    quarterlyReturn: -1.5
  },
  {
    id: "r-105",
    name: "Microsoft Corp",
    ticker: "MSFT",
    sector: "Technology",
    weight: 6.8,
    quarterlyReturn: 10.2
  },
  {
    id: "r-106",
    name: "Chevron Corp",
    ticker: "CVX",
    sector: "Energy",
    weight: 3.2,
    quarterlyReturn: 1.7
  },
  {
    id: "r-107",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    sector: "Healthcare",
    weight: 5.0,
    quarterlyReturn: 3.4
  },
  {
    id: "r-108",
    name: "Goldman Sachs",
    ticker: "GS",
    sector: "Technology",
    weight: 2.9,
    quarterlyReturn: 5.6
  }
];

export const createLoadedState = () => ({
  ids: mockReportsData.map(r => r.id),
  entities: mockReportsData.reduce((acc, r) => {
    acc[r.id] = r;
    return acc;
  }, {}),
  status: 'succeeded',
  error: null,
  selectedIds: [],
  searchTerm: '',
  sectorFilter: 'All',
});