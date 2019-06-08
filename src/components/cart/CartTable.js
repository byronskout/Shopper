
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`

const Remove = styled.span`
  cursor: pointer;
  opacity: .5;
  transition: opacity .5s;
  &:hover { opacity: 1; }
`

class CartTable extends Component {

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.props.items.map((d,i) => {
            let attrs = [];
            for (let key in d.attr) {
              attrs.push(`${key.replace("_", " ")}: ${d.attr[key]}`)
            }
            attrs = attrs.join(", ");

            return (<tr key={`cart${i}`}>
              <td>

              </td>
              <td>
                <TextField
                  value={d.quantity}
                  onChange={(e) => {
                    if (e.target.value < 0) e.target.value = 0;
                    this.props.updateCount(i, e.target.value)}
                  }
                  type="number"
                  margin="none"
                  style={{ width: "40px" }}
                />
              </td>
              <td>
                ${(d.quantity*d.price).toFixed(2)}
              </td>
              <td>
                <Remove onClick={() => this.props.removeItem(i)}>✕</Remove>
              </td>
            </tr>);
          })}
        </tbody>
      </Table>
    );
  }
};

export default withTheme()(CartTable);
