import React from 'react';

function Buttons() {
  return (
    <div>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}
