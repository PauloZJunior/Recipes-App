import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeInProgress from './RecipeInProgress';

describe('RecipeInProgress', () => {
  it('marca os ingredientes corretamente ao clicar no checkbox', () => {
    render(<RecipeInProgress />);

    const ingredientCheckboxes = screen.getAllByTestId(/-ingredient-step/);
    const firstIngredientCheckbox = ingredientCheckboxes[0];

    fireEvent.click(firstIngredientCheckbox);

    expect(firstIngredientCheckbox.checked).toBe(true);

    const ingredientName = screen.getByText('Nome do Ingrediente - Medida');
    expect(ingredientName).toHaveStyle('text-decoration: line-through');
  });
});
