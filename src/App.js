import React from 'react';
import './App.css';
import config from './assets/store_config';

import Banner from './components/ui/Banner';
import Product from './components/product/Product';
import Products from './components/product/Products';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: config.colors.primary.main,
      dark: config.colors.primary.dark,
      contrastText: config.colors.primary.contrastText
    },
    secondary: { main: config.colors.secondary.main },
  },
  typography: {
    fontFamily: [
      'Raleway',
      'Roboto',
      'Helvetica',
      'sans-serif'
    ]
  },
});

function App() {
  return (
    <div>
    <Router>
    <Banner config={config}/>
    <Route exact path="/product"
                  render={(props) => <Products config={config} />}
                />
                { config.products.map((product,i) =>
                    <Route exact key={`route${i}`}
                      path={`/product/${product.url}`}
                      render={(props) =>
                        <Product product={product} config={config}
                          updateNumber={this.updateNumber}
                        />
                      }
                    />
                  )
                }
    </Router>
    </div>
  );
}

export default App;
