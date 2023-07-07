import { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

//import { contacts as contactList } from './assets/data';

import './App.css'


function App() {
  const [contacts, setContacts] = useState([]);
  const  [ selected, setSelected ] = useState(null);
  const [ singleContact, setSingleContact ] = useState({
    name: '',
    phone: '',
    photo: '',
  });
  const [ loadingList, setLoadingList ] = useState(true);
  const [ errorList, setErrorList ] = useState(null);

  useEffect(() => {
    (async function fetchData(){
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`)
        const users = await response.json();
        setContacts(users.data)
        
      } catch(error) {
        setErrorList(`Ups! ocurrió algo, intentalo más tarde. Error: ${error}`)
      } finally {
        setLoadingList(false)
      }
    })()
  }, [])



  const handleAddContact = (newContact) => {
    const contactIndex = contacts.findIndex((item) => item.id === newContact.id)

    if(contactIndex !== -1) {
      const updateContacts = [...contacts];
      updateContacts[contactIndex] = newContact;
      setContacts(updateContacts);
      setSelected(null)
    } else {
      setContacts([...contacts, newContact]);
    }
  }

  return (
    <div>
      <h1>Lista de Contactos</h1>
      <ContactForm 
        onAddContact={handleAddContact}
        singleContact={singleContact} 
        setSingleContact={setSingleContact}
      />
      <ContactList 
        contacts={contacts} 
        setSingleContact={setSingleContact} 
        setSelected={setSelected}
        selected={selected}
        loadingList={loadingList}
        errorList={errorList}
      />
    </div>
  )
}

export default App
