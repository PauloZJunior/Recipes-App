import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './RecipeCard.css';

function RecipeCard({ name, src, index, id }) {
  const { pathname } = useLocation();
  return (
    <div
      className="recipe-card d-flex flex-wrap custom-border mb-2"
      data-testid={ `${index}-recipe-card` }
      style={ { width: '46%' } }
    >
      <Link
        to={ pathname === '/meals' ? `/meals/${id}` : `/drinks/${id}` }
        className="text-decoration-none text-reset"
      >
        <img
          src={ `${src}/preview` }
          alt={ name }
          data-testid={ `${index}-card-img` }
          className="card-img-top w-100"
        />
        <div className="card-body text-center">
          <h5
            data-testid={ `${index}-card-name` }
            className="card-title"
          >
            {name}
          </h5>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
