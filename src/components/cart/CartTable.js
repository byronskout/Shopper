
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
                <Flex>
                  <Image img={d.img} />
                  <Title>
                    <Name underline={this.props.theme.palette.primary.main}>
                      <Link to={d.url ? d.url : "/"}>{d.name}</Link>
                    </Name>
                    <Attrs>{attrs}</Attrs>
                  </Title>
                </Flex>
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
