import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import  NavBar  from './Components/NavBar'
import { Provider } from "react-redux";
import store from './Store/index'

describe("NavBar", () => {
  beforeEach(() => {
    render(
      <Provider store = {store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
      </Provider>
    );
  });
  it("Debe tener un link con Create Pokemon", () => {
    screen.logTestingPlaygroundURL();
    const element = screen.getByText('Create Pokemon')
    expect(element.innerHTML).toBe("Create Pokemon");
  });

  it("Debe tener un link que muestre todos los Pokemons", () => {
    const element = screen.getByText('All Pokemons');
    expect(element.innerHTML).toBe("All Pokemons");
  });
  // it("Debe tener un link con Create", () => {
  //   const element = screen.getByText("My team");
  //   expect(element.innerHTML).toBe("My team");
  // });
});