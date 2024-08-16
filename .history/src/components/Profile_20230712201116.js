import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{user.email}</h1>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
