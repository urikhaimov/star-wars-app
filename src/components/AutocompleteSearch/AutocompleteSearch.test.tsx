import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import AutocompleteSearch from './AutocompleteSearch';

describe('AutocompleteSearch', () => {
  it('renders the input field with the correct value', () => {
    const mockHandleSearchChange = vi.fn();
    const query = 'Luke Skywalker';

    render(<AutocompleteSearch query={query} handleSearchChange={mockHandleSearchChange} />);

    // Assert the input field is rendered with the correct placeholder and value
    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(query);
  });

  it('calls the handleSearchChange function when the input value changes', () => {
    const mockHandleSearchChange = vi.fn();
    const query = '';

    render(<AutocompleteSearch query={query} handleSearchChange={mockHandleSearchChange} />);

    // Simulate a change event on the input
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Darth Vader' } });

   
  });
});
