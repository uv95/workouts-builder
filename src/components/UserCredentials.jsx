import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as LockIcon } from '../assets/svg/lockIcon.svg';
import { ReactComponent as Email } from '../assets/svg/email.svg';
import { ReactComponent as VisibilityIcon } from '../assets/svg/visibilityIcon.svg';

function UserCredentials({ setShowUserCredentials }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

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
      if (userCredential.user) setShowUserCredentials(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newWorkoutBackground w-full h-full bg-black/30 fixed top-0 left-0 flex justify-center items-center z-10">
      <form
        onSubmit={onSubmit}
        className="mt-36 form-control w-80 text-lg bg-white rounded-box p-4"
      >
        <p className="mx-auto mb-4">Please sign in again</p>
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
        <label className="input-group mb-4">
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
        <button type="submit" className="btn btn-accent w-40 mx-auto mb-1">
          Sign in
        </button>
      </form>
      //{' '}
    </div>
  );
}

export default UserCredentials;
