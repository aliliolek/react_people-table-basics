import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { LoadingError } from '../../components/LoadingError';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const loadPeople = () => {
    setLoading(true);

    getPeople()
      .then(peopleData => {
        setPeople([...peopleData.map((person) => ({
          ...person,
          father: person.fatherName
            ? peopleData.find((p) => p.name === person.fatherName) : null,
          mother: person.motherName
            ? peopleData.find((p) => p.name === person.motherName) : null,
        }))]);
        setLoading(false);
      })
      .catch(() => {
        setLoadingError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {loadingError ? (
                <LoadingError />
              ) : (
                <>
                  {people.length > 0 ? (
                    <PeopleTable
                      people={people}
                    />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};