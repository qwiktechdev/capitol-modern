import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getContact } from '../Services/GetUser.service';

const ContactusLog: React.FC = () => {
  const [contact, setcontact] = useState<any[]>([]);

  const getUsers = async () => {
    getContact('', (res: any) => {
      setcontact(res);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="font-semibold text-slate-900">Support Messages</h3>
        <p className="text-sm text-slate-500">Contact form submissions from users</p>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Created</th>
              <th>Name</th>
              <th className="text-center">Message</th>
            </tr>
          </thead>
          <tbody>
            {contact?.length === 0 ? (
              <tr><td colSpan={4} className="py-12 text-center text-slate-400">No messages yet</td></tr>
            ) : (
              contact.map((user: any, id: number) => (
                <tr key={user.id}>
                  <td>{id + 1}</td>
                  <td>{moment(user.created).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="font-medium">{user.name}</td>
                  <td className="text-center">{user.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactusLog;
