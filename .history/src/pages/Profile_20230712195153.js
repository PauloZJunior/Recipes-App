import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  console.log(user[0]);
  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
