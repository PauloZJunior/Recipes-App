/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/context';
import Recipes from '../components/Recipes';
import { fetchAllMeals } from '../services/recipeFetch';
import useFetch from '../hooks/useFetch';

function Meals() {
  const { setRecipes } = useContext(Context);
  const { loading, fetchApi } = useFetch();

  useEffect(() => {
    const initialFetch = async () => {
      const response = await fetchApi(fetchAllMeals);
      setRecipes(response.meals);
    };
    initialFetch();
  }, []);

  return (
    <div>
      <Header />
      {
        loading ? <p>Loading...</p> : (
          <div>
            <Recipes />
          </div>
        )
      }
      <Footer />
    </div>
  );
}

export default Meals;
