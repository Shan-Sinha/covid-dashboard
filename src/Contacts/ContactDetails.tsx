import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteContact, editContact, Contact } from '../contactsSlice';
import '../App.css'

export interface ContactDetailsProps {
  contactId: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contactId }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === contactId);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [isActive, setIsActive] = useState<boolean>(contact?.active || true);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setName(contact.name);
    setPhone(contact.phone);
    setIsActive(true); 
  };
  
  const handleSave = () => {
    console.log(name,phone,isActive)
    const updatedContact: Contact = {
      id: contact.id,
      name:name,
      phone:phone,
      active:isActive
    }
    dispatch(editContact(updatedContact))

  };
  
  
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      {editing ? (
        <>
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
          <div className="radio-container">
          <input type="radio" id="active" name="isActive" value={String(isActive)} onChange={()=>setIsActive(true)} className="radio" />
          <label className="label" htmlFor="active">Active</label><br />
          <input type="radio" id="inactive" name="isActive" value={String(isActive)} onChange={()=>setIsActive(false)} className="radio" />
          <label className="label" htmlFor="inactive">In Active</label><br />
          </div>
          <div className="button-container">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleCancel} className="button">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>Name: {contact.name}</p>
          <p>Phone: {contact.phone}</p>
          <p>Active: {contact.active ? 'Yes' : 'No'}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ContactDetails;
