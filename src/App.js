import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
import WorkoutItem from './components/profile/workout/WorkoutItem';
import Footer from './components/Footer';

function App() {
  return (
    <ExercisesProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="relative">
            <Navbar />
            <main className="container mx-auto flex flex-col items-center min-h-screen">
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
            <Footer />
          </div>
        </Router>
      </DndProvider>
    </ExercisesProvider>
  );
}

export default App;
