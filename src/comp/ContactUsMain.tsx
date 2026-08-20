import React, { useState } from 'react';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';

interface props {
  hidImage4?: boolean;
}

const ContactUs: React.FC<props> = ({ hidImage4 }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = {
        id: getRandomString(35, '1234567890qwertyuiopasdfhjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM'),
        isRead: false,
        name,
        email,
        subject,
        message,
        created: serverTimestamp(),
      };

      const docRef = doc(collection(database, 'contactUs'), user.id);
      await setDoc(docRef, user);
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">Get in touch</span>
          <h2 className="section-title mt-3">We&apos;d love to hear from you</h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {!hidImage4 && (
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img src="/image/c12.png" alt="Contact De Capitol" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900">Leave us a message</h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
              </div>

              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="select-field" required>
                <option value="">Select Subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Support">Loan</option>
                <option value="Support">Account Funding</option>
                <option value="Feedback">Feedback</option>
              </select>

              <textarea placeholder="Send a message" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea-field h-32" required />

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Sending...' : 'Contact Us'}
              </button>

              {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Message sent successfully!</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
