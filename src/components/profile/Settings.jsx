import React, { useState } from 'react';
import {
  getAuth,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import UserCredentials from '../UserCredentials';

function Settings() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [showUserCredentials, setShowUserCredentials] = useState(false);
  const [userCredentials, setUserCredentials] = useState(null);
  const [name, setName] = useState(auth.currentUser.displayName);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setName(e.target.value);
  };
  const onDelete = async () => {
    try {
      if (window.confirm('Are you sure you want to delete your account?')) {
        await deleteUser(auth.currentUser);
      }
    } catch (error) {
      console.log(error);
      setShowUserCredentials(true);
    }
  };

  return (
    <>
      {showUserCredentials && (
        <UserCredentials
          setShowUserCredentials={setShowUserCredentials}
          setUserCredentials={(e) => setUserCredentials(e)}
        />
      )}
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-3xl">Edit name</p>
          <form className="mt-5 flex gap-3">
            <input
              type="text"
              className={`
            ${!changeDetails ? 'input-primary ' : 'input-primary'}
              input input-bordered w-44`}
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <div
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
              className={`btn w-20 ${
                changeDetails ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {changeDetails ? 'ok' : 'edit'}
            </div>
          </form>
        </div>
        <div>
          <p className="text-3xl">Delete account</p>
          <div onClick={onDelete} className="btn btn-accent w-32 mt-5">
            Delete
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
