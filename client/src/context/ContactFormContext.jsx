import React, { createContext, useState, useContext } from 'react';

const ContactFormContext = createContext();

export const useContactForm = () => useContext(ContactFormContext);

export const ContactFormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <ContactFormContext.Provider value={{ isFormOpen, openForm, closeForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};