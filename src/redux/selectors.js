import { createSelector } from '@reduxjs/toolkit';
export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.filter;
export const selectLoading = state =>state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFiltered = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);
