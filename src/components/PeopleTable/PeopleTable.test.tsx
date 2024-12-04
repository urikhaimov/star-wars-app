import { render, screen, fireEvent } from '@testing-library/react';
import PeopleTable from './PeopleTable';
import { Person } from '../../types/swapi';
import { describe, expect, it, vi } from 'vitest';
const mockData: Person[] = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Leia Organa',
    gender: 'female',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/2/',
  },
];

const mockOnDelete = vi.fn();
const mockOnEdit = vi.fn();

describe('PeopleTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the table with correct headers', () => {
    render(<PeopleTable data={mockData} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Birth Year')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('displays the correct data rows', () => {
    render(<PeopleTable data={mockData} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    mockData.forEach((person) => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      
    });
  });

  it('calls onEdit when the Edit button is clicked', () => {
    render(<PeopleTable data={mockData} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    render(<PeopleTable data={mockData} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockData[1].url);
  });

  it('renders without data', () => {
    render(<PeopleTable data={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    // Ensure no rows are rendered
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    expect(screen.queryByText('Leia Organa')).not.toBeInTheDocument();
  });
});
