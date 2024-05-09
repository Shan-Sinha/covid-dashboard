import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../contactsSlice';
import '../App.css';


interface ContactFormProps {
  onSubmit?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isInactive, setIsInactive] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && phone) {
      const newContact = {
        id: Date.now().toString(),
        name,
        phone,
        active: isActive,
      };
      dispatch(addContact(newContact));
      setName('');
      setPhone('');
      setIsActive(true);
      setIsInactive(false);
      if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form-control"
      />
      <div className="checkbox-container">
        <label className="label">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => {
              setIsActive(e.target.checked);
              setIsInactive((prevState) => !e.target.checked);
            }}
            className="checkbox"
          />
          Active
        </label>
        <label className="label">
          <input
            type="checkbox"
            checked={isInactive}
            onChange={(e) => {
              setIsInactive(e.target.checked);
              setIsActive((prevState) => !e.target.checked);
            }}
            className="checkbox"
          />
          Inactive
        </label>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md focus:outline-none">Add Contact</button>
    </form>
  );
};

export default ContactForm;