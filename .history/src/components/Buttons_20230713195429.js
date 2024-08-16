import React, { useState } from 'react';

function Buttons() {
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Continue Recipe
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isRecipeDone }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default Buttons;
