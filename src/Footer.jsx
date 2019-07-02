
import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

function Footer(/*props*/) {
  return (
    <div className="footer">
    <footer>
        <Nav justified>
          <NavItem
            eventKey={1}>
            Privacy policy
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
          <NavItem
            eventKey={3}>
            Some other professional link
          </NavItem>
        </Nav>

        <div className="text-center small copyright">
          © UU 2019
        </div>
    </footer>
    </div>
  );
}

export default Footer;
