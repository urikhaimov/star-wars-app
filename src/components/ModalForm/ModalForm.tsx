import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Person } from '../../types/swapi';

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (person: Person) => void;
  initialData?: Person | null; // Optional initial data for editing
}

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Person>({
    name: '',
    height: '',
    mass: '',
    gender: '',
    birth_year: '',
    url: '' // For new entries, you can leave this as an empty string or generate one.
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        height: '',
        mass: '',
        gender: '',
        birth_year: '',
        url: ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Character' : 'Create Character'}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="height"
          label="Height"
          value={formData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="mass"
          label="Mass"
          value={formData.mass}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="birth_year"
          label="Birth Year"
          value={formData.birth_year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
