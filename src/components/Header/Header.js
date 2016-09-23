import './Header.scss';

import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Header = () => (
  <div>
    <h1>React Grid Sample App</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/grid' activeClassName='route--active'>
      Grid
    </Link>
    {' · '}
    <Link to='/about' activeClassName='route--active'>
      About
    </Link>
  </div>
);

export default Header;
