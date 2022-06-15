import React from 'react';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import Exercises from './pages/Exercises';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import ExerciseItem from './pages/ExerciseItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import { ExercisesProvider } from './context/ExercisesContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import WorkoutItem from './components/profile/WorkoutItem';

function App() {
  return (
    <ExercisesProvider>
      <Router>
        <div className="h-screen">
          <Navbar />
          <main className="container mx-auto flex flex-col items-center justify-center gap-6">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile/*" element={<Profile />} />
              </Route>
              <Route
                path="profile/myworkouts/:workout"
                element={<WorkoutItem />}
              />
              <Route path="/exercises/selected" element={<SearchResults />} />
              <Route
                path="/exercises/selected/:exercise"
                element={<ExerciseItem />}
              />
              <Route
                path="/profile/favorites/:exercise"
                element={<ExerciseItem />}
              />
              <Route
                path="/profile/myworkouts/:workout/:exercise"
                element={<ExerciseItem />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ExercisesProvider>
  );
}

export default App;
