
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CartTable from './CartTable';

const RightSide = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   margin-top: 40px;
`
const Subtotal = styled.div`
  margin-bottom: 20px;
  > span {
    font-size: 14px;
    color: #888;
    margin-right: 15px;
  }
`

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      total: 0,
    };
  }
  componentDidMount() {
    const slug = `${this.props.config.store_slug}_products`;
    let items = JSON.parse(localStorage.getItem(slug));
    this.setState({
      items : items ? items : []
    })
  }

  render() {
    let totalPrice;
    if (this.state.items.length) {
      totalPrice = this.state.items
        .map(i => (i.quantity*i.price))
        .reduce((a,b) => a+Number(b))
        .toLocaleString('en-US', { style: 'currency', currency: 'GBP' })
    }
    return (
      <PageWrapper>
        <Paper>

          <h2 style={{ marginTop: 0, fontWeight: 600 }}>Cart</h2>
            { this.state.items.length > 0 &&
              <div>
                <CartTable
                  items={this.state.items}
                  config={this.props.config}
                />
                <RightSide>
                  <Subtotal>
                    <span>Subtotal</span>
                    {totalPrice}
                  </Subtotal>
                  <Link to={`/checkout`} style={{ textDecoration: "none" }}>
                    <Button variant="raised" color="primary">Check Out</Button>
                  </Link>
                </RightSide>
              </div>
            }
            { this.state.items.length === 0 &&
              <p>You cart is empty.</p>
            }

        </Paper>
      </PageWrapper>
    );
  }
};

export default Cart;
