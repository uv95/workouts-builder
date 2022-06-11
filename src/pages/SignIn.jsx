import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as VisibilityIcon } from '../assets/svg/visibilityIcon.svg';
import Alert from '../components/Alert';
import { ReactComponent as LockIcon } from '../assets/svg/lockIcon.svg';
import { ReactComponent as Email } from '../assets/svg/email.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // set the current user's favorites and workouts to local storage
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
      } catch (error) {
        console.log(error);
      }

      if (userCredential.user) navigate('/profile');
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showAlert && <Alert type="error" text="Wrong email or password." />}
      <form onSubmit={onSubmit} className="mt-36 form-control w-80 text-lg ">
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
        <label className="input-group mb-2">
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
        <Link to="/forgot-password" className="text-sm mb-3">
          Forgot password?
        </Link>
        <button className="btn btn-primary w-40 mx-auto mb-5">Sign in</button>
        <p className="mx-auto text-base-300">
          Don't have an account yet?{' '}
          <Link to="/sign-up" className="link link-primary font-bold">
            Sign up.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignIn;
