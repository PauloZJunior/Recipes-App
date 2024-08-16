import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import Provider from '../context/Provider';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

describe('test', () => {
  it('test', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(oneMeal)
        .mockResolvedValue(drinks),
    });

    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals/52771'] },
    );

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
  });
  it('tes2', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValue(meals),
    });

    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks/178319'] },
    );

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });
});
