import React, { useState, useEffect } from 'react';
import PeopleTable from '../components/PeopleTable';
import ModalForm from '../components/ModalForm';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Person } from '../types/swapi';
import useCategoryResults from '../hooks/useCategoryResults';
import { Button } from '@mui/material';


const PeoplePage: React.FC = () => {
  const { data, isLoading, isError } = useCategoryResults('people');
  const [people, setPeople] = useState<Person[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);

  useEffect(() => {
    setPeople(data ? data?.results : [])
  }, [data])

  const handleDelete = (url: string) => {
    setPeople(people.filter((person) => person.url !== url));
  };

  const handleEdit = (person: Person) => {
    setEditPerson(person); // Set the person to edit
    setModalOpen(true);
  };

  const handleCreate = () => {
    const newPerson: Person = {
      name: 'New Character',
      height: 'Unknown',
      mass: 'Unknown',
      gender: 'Unknown',
      birth_year: 'Unknown',
      url: `${Date.now()}`,
    };
    setPeople([...people, newPerson]);
  };
  const handleSave = (person: Person) => {
    if (person.url) {
      // Editing an existing person
      setPeople(people.map((p) => (p.url === person.url ? person : p)));
    } else {
      // Creating a new person
      person.url = `${Date.now()}`; // Generate a unique ID for local use
      setPeople([...people, person]);
    }
  };
  return (
    <div>

      <h1>People</h1>
      <Button variant="outlined" onClick={handleCreate}>Create</Button>
      {!!isLoading && <Loader />}
      {!!isError && <Error />}
      {!isLoading && people && people.length &&
        <>
          <PeopleTable data={people} onDelete={handleDelete} onEdit={handleEdit} />
          <ModalForm
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSave}
            initialData={editPerson}
          />
        </>
      }

    </div>
  );
};

export default PeoplePage;
