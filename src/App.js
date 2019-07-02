import React from 'react';
import config from './assets/store_config';
import { StripeProvider } from 'react-stripe-elements';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Banner from './components/ui/Banner';
import Product from './components/product/Product';
import Products from './components/product/Products';
import Checkout from './components/checkout/Checkout';
import ScrollToTop from './components/ui/ScrollToTop';
import Landing from './components/Landing';
import Cart from './components/cart/Cart';
import Footer from './Footer';

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

class App extends React.Component {

  state = {};

  componentDidMount() {
    const slug = `${config.store_slug}_products`;
    const items = JSON.parse(localStorage.getItem(slug));
    this.setState({ quantity : items ? items.length : 0 })
  }
  updateNumber = (quantity) => {
    this.setState({ quantity });
  }
  render() {
  return (
  <StripeProvider apiKey={config.api_key}>
    <Router>
     <ScrollToTop>
      <MuiThemeProvider theme={theme}>
      <div className={config.store_slug}>
              <div className="bg" />
              <Banner quantity={this.state.quantity} config={config} />
              <Route exact path="/"
                render={(props) => <Landing config={config} />}
              />
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
              <Route exact path="/cart"
                  render={(props) => <Cart config={config} updateNumber={this.updateNumber} />}
                />
                <Route exact path="/checkout"
                  render={(props) => <Checkout config={config} />}
                />
                <Footer/>
              </div>
          </MuiThemeProvider>
      </ScrollToTop>
    </Router>
   </StripeProvider>
  );
 }
}

export default App;
