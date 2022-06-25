import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { ReactComponent as VisibilityIcon } from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as PersonIcon } from '../assets/svg/personIcon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/googleIcon.svg';
import { ReactComponent as LockIcon } from '../assets/svg/lockIcon.svg';
import { ReactComponent as Email } from '../assets/svg/email.svg';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

function SignUp() {
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    favorites: [],
    workouts: [],
    plannedWorkouts: [],
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists())
          localStorage.setItem(
            'favorites',
            JSON.stringify(userSnap.data().favorites)
          );
        localStorage.setItem(
          'workouts',
          JSON.stringify(userSnap.data().workouts)
        );
        localStorage.setItem(
          'planned workouts',
          JSON.stringify(userSnap.data().plannedWorkouts)
        );
      } catch (error) {
        console.log(error);
      }

      navigate('/profile/myworkouts');
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          type="error"
          text="Could not sign up. Please try again."
          position="absolute top-24"
          icon="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )}
      <form className="mt-36 form-control w-80 text-lg" onSubmit={onSubmit}>
        <label className="input-group mb-5">
          <span className="w-16 bg-primary flex justify-center">
            <PersonIcon fill="#fff" width="24px" />
          </span>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            className="input input-bordered w-full border-l-0 border-secondary-content"
            onChange={onChange}
          />
        </label>
        <label className="input-group mb-5">
          <span className="w-16 bg-primary flex justify-center">
            <Email fill="#fff" width="20px" height="29px" />
          </span>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            className="input input-bordered w-full border-l-0 border-secondary-content"
            onChange={onChange}
          />
        </label>
        <label className="input-group mb-5">
          <span className="w-16 bg-primary flex justify-center">
            <LockIcon fill="#fff" width="24px" />
          </span>
          <div className="input input-bordered w-full border-l-0 border-secondary-content flex">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="password"
              value={password}
              className="input p-0"
              onChange={onChange}
            />
            <VisibilityIcon
              fill="#555"
              width="20px"
              className="my-auto ml-16 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </label>
        <button className="btn btn-primary w-40 mx-auto mb-5">Sign up</button>
        <p className="mx-auto mb-2 text-neutral">Or sign up with</p>
        <GoogleIcon className="mx-auto w-12 h-12 mb-5" />
        <p className="mx-auto text-base-300">
          Already have an account?{' '}
          <Link to="/sign-in" className="link link-primary font-bold">
            Sign in.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;
