import React, { useContext } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Exercises from './components/Exercises';
import Login from './components/Login';
import ExerciseItem from './components/ExerciseItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import { ExercisesProvider } from './context/ExercisesContext';

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
              <Route path="/login" element={<Login />} />
              <Route path="/exercises/selected" element={<SearchResults />} />
              <Route
                path={`/exercises/selected/:link`}
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
