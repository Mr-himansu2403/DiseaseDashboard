import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('recharts', () => {
  const React = require('react');
  const MockChart = ({ children }) => React.createElement('div', null, children);
  const MockElement = () => React.createElement('div', null);

  return {
    ResponsiveContainer: MockChart,
    PieChart: MockChart,
    Pie: MockChart,
    Cell: MockElement,
    Legend: MockElement,
    Tooltip: MockElement,
    BarChart: MockChart,
    Bar: MockElement,
    XAxis: MockElement,
    YAxis: MockElement,
    CartesianGrid: MockElement,
  };
});

test('renders dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/DIACUE TEST REPORT/i);
  expect(titleElement).toBeInTheDocument();
});
