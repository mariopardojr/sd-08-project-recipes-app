import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ShareButton from '../components/ShareButton';

function RecipesDoneAndFavorite({ location: { pathname } }) {
  const { done, favorite } = useSelector((state) => state.recipes);
  const [recipes, setRecipes] = useState([]);
  const [isDone, setIsDone] = useState();

  useEffect(() => {
    if (pathname.endsWith('feitas')) {
      setRecipes(done);
      setIsDone(true);
    } else {
      setIsDone(false);
      setRecipes(favorite);
    }
  }, [pathname]);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {recipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
          <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
          { isDone && (
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
          )}
          <ShareButton id={ recipe.id } type={ recipe.type } />
          {isDone && (
            recipe.tags.map((tag, tagIndex) => (
              <p
                key={ `${recipe.id}-tag-${tagIndex}` }
                data-testid={ `${tagIndex}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            ))
          )}
        </div>
      ))}
    </div>

  );
}

RecipesDoneAndFavorite.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesDoneAndFavorite;
