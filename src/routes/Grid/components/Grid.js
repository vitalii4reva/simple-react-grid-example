import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import ColDefFactory from '../ColDefFactory.jsx';
import RowDataFactory from '../RowDataFactory';


export default class Grid extends Component {

  constructor (props) {
    super(props);

    this.onShowGrid = this.onShowGrid.bind(this, false);
    this.onShowGridTrue = this.onShowGrid.bind(this, true);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.setCountryVisible = this.setCountryVisible.bind(this, false);
    this.setCountryVisibleTrue = this.setCountryVisible.bind(this, true);
    this.onGridReady = this.onGridReady.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onAlignRight = this.onAlignRight.bind(this);
    this.onAlignCenter = this.onAlignCenter.bind(this);
    this.onAlignLeft = this.onAlignLeft.bind(this);

    this.state = {
      quickFilterText: null,
      showGrid: true,
      showToolPanel: false,
      columnDefs: new ColDefFactory().createColDefs(),
      rowData: new RowDataFactory().createRowData(),
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        sortAscending: '<i class="fa fa-long-arrow-down"/>',
        sortDescending: '<i class="fa fa-long-arrow-up"/>',
        groupExpanded: '<i class="fa fa-minus-square-o"/>',
        groupContracted: '<i class="fa fa-plus-square-o"/>',
        columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
        columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
      }
    };
    this.currentCell = null;
  }

  onShowGrid = (show) => {
    this.setState({
      showGrid: show
    });
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  selectAll = () => {
    this.api.selectAll();
  }

  deselectAll = () => {
    this.api.deselectAll();
  }

  setCountryVisible = (visible) => {
    this.columnApi.setColumnVisible('country', visible);
  }

  onCellClicked = (event) => {
    // console.log('clicked Cell: ', event);
  }

  onAlignLeft = (event) => {
    const res = document.querySelectorAll('.active-cell')[0];
    if (res) {
      res.classList.remove('text-right', 'text-center');
      res.classList.toggle('text-left');
    }
  };

  onAlignCenter = (event) => {
    const res = document.querySelectorAll('.active-cell')[0];
    if (res) {
      res.classList.remove('text-left', 'text-right');
      res.classList.toggle('text-center');
    }
  };
  onAlignRight = (event) => {
    const res = document.querySelectorAll('.active-cell')[0];
    res.classList.remove('text-left', 'text-center');
    res.classList.toggle('text-right');
  };

  onRefreshData = () => {
    const newRowData = new RowDataFactory().createRowData();
    this.setState({
      rowData: newRowData
    });
  };

  render () {
    var gridTemplate;
    var bottomHeaderTemplate;
    var topHeaderTemplate;

    topHeaderTemplate = (
      <div>
        <div style={{ float: 'left' }}>
          <button id='btAlignLeft' data-action-type='left'
            onClick={this.onAlignLeft}>Align left</button>
          <button id='btAlignCenter' data-action-type='center'
            onClick={this.onAlignCenter}>Align center</button>
          <button id='btAlignRight' data-action-type='right'
            onClick={this.onAlignRight}>Align right</button>
        </div>
      </div>
    );

    // showing the bottom header and grid is optional, so we put in a switch
    if (this.state.showGrid) {
      bottomHeaderTemplate = (
        <div>
          <div style={{ clear: 'both' }} />
          <div style={{ padding: 4 }} className={'toolbar'}>
            <button onClick={this.onRefreshData}>Refresh Data</button>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      );
      gridTemplate = (
        <div style={{ height: 400 }} className='ag-fresh'>
          <AgGridReact
            onGridReady={this.onGridReady}
            onRowSelected={this.onRowSelected}
            onCellClicked={this.onCellClicked}
            showToolPanel={this.state.showToolPanel}
            quickFilterText={this.state.quickFilterText}
            icons={this.state.icons}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowSelection='multiple'
            enableColResize='true'
            enableSorting='true'
            enableFilter='true'
            groupHeaders='true'
            rowHeight='22'
            debug='true'
            />
        </div>
      );
    }

    return <div style={{ width: '800px' }}>
      <div style={{ padding: '4px' }}>
        {topHeaderTemplate}
        {bottomHeaderTemplate}
        {gridTemplate}
      </div>
    </div>;
  }

}
