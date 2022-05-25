import React, { useState } from 'react';
import { ReactComponent as Email } from '../assets/svg/email.svg';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Alert from '../components/Alert';
import Success from '../components/Success';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showAlert && <Alert type="error" text="Wrong email." />}
      {success ? (
        <>
          <Success text="Password reset link was sent to your email." />
          <p className="mx-auto">
            Back to{' '}
            <Link to="/sign-in" className="link link-primary font-bold">
              sign in.
            </Link>{' '}
          </p>
        </>
      ) : (
        <>
          <form
            onSubmit={onSubmit}
            className="mt-36 form-control w-80 text-lg "
          >
            <p className="mb-5 mx-auto text-2xl font-bold">Reset password</p>
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
            <button className="btn btn-primary w-42 mx-auto mb-5">
              Reset password
            </button>
            <p className="mx-auto">
              Back to{' '}
              <Link to="/sign-in" className="link link-primary font-bold">
                sign in.
              </Link>{' '}
            </p>
          </form>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
