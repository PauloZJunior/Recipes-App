import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.email);
  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
