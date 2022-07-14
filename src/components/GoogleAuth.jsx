import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as GoogleIcon } from '../assets/svg/googleIcon.svg';

function GoogleAuth({ setShowAlert }) {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      //if user doesnt exist - create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });

        localStorage.setItem('favorites', '[]');
        localStorage.setItem('workouts', '[]');
        localStorage.setItem('planned workouts', '[]');
        localStorage.setItem('weight', '[]');
      }

      navigate('/profile/myworkouts');
    } catch (error) {
      setShowAlert(true);
    }
  };
  return (
    <GoogleIcon
      onClick={onGoogleClick}
      className="cursor-pointer mx-auto w-12 h-12 mb-5"
    />
  );
}

export default GoogleAuth;
