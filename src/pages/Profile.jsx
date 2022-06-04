import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Favorites from '../components/profile/Favorites';
import Calendar from '../components/profile/Calendar';
import Statistics from '../components/Statistics';
import Measurements from '../components/profile/Measurements';
import Settings from '../components/profile/Settings';
import ProfileWrapper from '../components/profile/shared/ProfileWrapper';

function Profile() {
  return (
    <ProfileWrapper>
      <Routes>
        <Route path="favorites" element={<Favorites />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="measurements" element={<Measurements />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </ProfileWrapper>
  );
}

export default Profile;
