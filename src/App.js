import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import { ExercisesProvider } from './context/ExercisesContext';

function App() {
  return (
    <ExercisesProvider>
      <Router>
        <div className="h-screen">
          <Navbar />
          <main className="container mx-auto flex flex-col items-center gap-6">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/categories/selected_categories"
                element={<SearchResults />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ExercisesProvider>
  );
}

export default App;
