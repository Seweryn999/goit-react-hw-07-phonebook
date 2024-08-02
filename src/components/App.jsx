import React, { useEffect } from 'react';
import { Form } from './form/form';
import Input from './input/input';
import ContactList from './contact-list/contact-list';
import css from './App.module.css';
import {
  selectFilter,
  selectFiltered,
  selectError,
  selectLoading,
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filterSlice';
import operations from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filtered = useSelector(selectFiltered);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  const filterHandler = e => {
    const { name, value } = e.target;
    if (name === 'filter') {
      dispatch(setFilter(value));
    }
  };

  const removeContact = id => {
    dispatch(operations.deleteContact(id));
  };

  useEffect(() => {
    dispatch(operations.fetchContactsToDisplay());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Input
        label="Find contacts by name"
        type="text"
        dataName="filter"
        validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Search is not case sensitive"
        funcChange={filterHandler}
        stateField={filter}
      />
      <ContactList arr={filtered} btnHandler={removeContact} />
      {isLoading && !error && <b>Request in progress</b>}
    </div>
  );
};

export default App;
