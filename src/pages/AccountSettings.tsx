import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { database } from '../firebase';

const AccountSettings = () => {
  const auth = getAuth();
  const storage = getStorage();

  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleUpdateInfo = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userDoc = doc(database, 'user', user.uid);
      await updateDoc(userDoc, {
        ...(userInfo.name && { name: userInfo.name }),
        ...(userInfo.email && { email: userInfo.email }),
        ...(userInfo.phone && { phone: userInfo.phone }),
      });
      toast.success('User info updated successfully!');
    } catch (error) {
      toast.error('Failed to update user info.');
    }
  };

  const handleUploadImage = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !image) return;
      const imageRef = ref(storage, `user/${user.uid}/profileImage`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const userDoc = doc(database, 'user', user.uid);
      await updateDoc(userDoc, { image: imageUrl });
      toast.success('Profile image updated successfully!');
    } catch (error) {
      toast.error('Failed to upload image.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !oldPassword || !newPassword) return;
      const credential = EmailAuthProvider.credential(user.email || '', oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error('Failed to reset password.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="form-section">
        <h3 className="form-section-title">Update Personal Info</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Name" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="input-field" />
          <input type="email" placeholder="Email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} className="input-field" />
          <input type="text" placeholder="Phone" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="input-field" />
          <button type="button" onClick={handleUpdateInfo} className="btn-primary">Update Info</button>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Upload Profile Image</h3>
        <div className="space-y-4">
          <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="input-field" />
          <button type="button" onClick={handleUploadImage} className="btn-success">Upload Image</button>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Reset Password</h3>
        <div className="space-y-4">
          <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="input-field" />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" />
          <button type="button" onClick={handleResetPassword} className="btn-danger">Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
