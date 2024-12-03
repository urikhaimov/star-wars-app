import React from 'react';
import { Person } from '../../types/swapi';
import {Button, Table, TableBody, TableCell, TableHead,TableRow}  from '@mui/material';


interface PeopleTableProps {
  data: Person[];
  onDelete: (url: string) => void;
  onEdit: (person: Person) => void;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ data, onDelete, onEdit }) => {
   
  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Birth Year</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((person) => (
          <TableRow key={person.url}>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.gender}</TableCell>
            <TableCell>{person.birth_year}</TableCell>
            <TableCell>
              <Button  variant="outlined" onClick={() => onEdit(person)}>Edit</Button>
              <Button  variant="outlined" onClick={() => onDelete(person.url)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
};

export default PeopleTable;
