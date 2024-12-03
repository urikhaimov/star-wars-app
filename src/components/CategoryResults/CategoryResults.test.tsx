import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryResults, { CategoryResultsProps } from './CategoryResults';

describe('CategoryResults', () => {
  const mockOnViewAll = jest.fn();

  const defaultProps: CategoryResultsProps = {
    category: 'people',
    query: 'Luke',
    results: [
      { name: 'Luke Skywalker' },
      { name: 'Leia Organa' },
    ],
    onViewAll: mockOnViewAll,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the category title correctly', () => {
    render(<CategoryResults {...defaultProps} />);

    // Assert the category title is displayed
    const categoryTitle = screen.getByText('People');
    expect(categoryTitle).toBeInTheDocument();
  });

  it('renders a list of results correctly', () => {
    render(<CategoryResults {...defaultProps} />);

    // Assert each result is rendered
    const resultItems = screen.getAllByRole('heading');
   
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders the "View All" button when results are present', () => {
    render(<CategoryResults {...defaultProps} />);

    const viewAllButton = screen.getByText('View All');
    expect(viewAllButton).toBeInTheDocument();
  });

  it('calls the onViewAll function when "View All" button is clicked', () => {
    render(<CategoryResults {...defaultProps} />);

    const viewAllButton = screen.getByText('View All');
    fireEvent.click(viewAllButton);

    // Assert the handler was called with the correct argument
    expect(mockOnViewAll).toHaveBeenCalledTimes(1);
    expect(mockOnViewAll).toHaveBeenCalledWith('people');
  });

  it('does not render anything if results are empty or query is empty', () => {
    const propsWithNoResults = {
      ...defaultProps,
      query: '',
      results: [],
    };

    render(<CategoryResults {...propsWithNoResults} />);

    // Assert no category title or button is rendered
    expect(screen.queryByText('People')).not.toBeInTheDocument();
    expect(screen.queryByText('View All')).not.toBeInTheDocument();
  });
});
