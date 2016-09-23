import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

import '../../styles/core.scss';
import './CoreLayout.scss';
import './Grid.scss';

import React from 'react';

import Header from '../../components/Header';

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
