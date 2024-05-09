import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../App.css'
import { Link } from 'react-router-dom';

interface ContactListProps {
  onViewDetails: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onViewDetails }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <span className="contact-name">{contact.name}</span>
        <span className="contact-phone">{contact.phone}</span>
            <Link to={`/contact-detail`} onClick={() => onViewDetails(contact.id)} className='view-details-button'>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;