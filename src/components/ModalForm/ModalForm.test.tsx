import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalForm, { ModalFormProps } from './ModalForm';

describe('ModalForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps: ModalFormProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    initialData: null,
  };

  const renderComponent = (props: Partial<ModalFormProps> = {}) =>
    render(<ModalForm {...defaultProps} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog with create form when no initial data is provided', () => {
    renderComponent();

    // Verify dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Verify dialog title for creation
    expect(screen.getByText('Create Character')).toBeInTheDocument();

    // Verify input fields are empty
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Height')).toHaveValue('');
    expect(screen.getByLabelText('Mass')).toHaveValue('');
    expect(screen.getByLabelText('Gender')).toHaveValue('');
    expect(screen.getByLabelText('Birth Year')).toHaveValue('');
  });

  it('renders the dialog with edit form when initial data is provided', () => {
    const initialData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      url: '',
    };

    renderComponent({ initialData });

    // Verify dialog title for editing
    expect(screen.getByText('Edit Character')).toBeInTheDocument();

    // Verify input fields are populated with initial data
    expect(screen.getByLabelText('Name')).toHaveValue(initialData.name);
    expect(screen.getByLabelText('Height')).toHaveValue(initialData.height);
    expect(screen.getByLabelText('Mass')).toHaveValue(initialData.mass);
    expect(screen.getByLabelText('Gender')).toHaveValue(initialData.gender);
    expect(screen.getByLabelText('Birth Year')).toHaveValue(initialData.birth_year);
  });

  it('calls onClose when the Cancel button is clicked', () => {
    renderComponent();

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Verify onClose is called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data and closes the dialog when Save is clicked', () => {
    const formData = {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      gender: 'female',
      birth_year: '19BBY',
      url: '',
    };

    renderComponent();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: formData.name } });
    fireEvent.change(screen.getByLabelText('Height'), { target: { value: formData.height } });
    fireEvent.change(screen.getByLabelText('Mass'), { target: { value: formData.mass } });
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: formData.gender } });
    fireEvent.change(screen.getByLabelText('Birth Year'), { target: { value: formData.birth_year } });

    // Click Save
    fireEvent.click(screen.getByText('Save'));

    // Verify onSubmit is called with correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(formData);

    // Verify onClose is also called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render the dialog when open is false', () => {
    renderComponent({ open: false });

    // Verify dialog is not in the document
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
