import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{user.email}</h1>
      <button
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
