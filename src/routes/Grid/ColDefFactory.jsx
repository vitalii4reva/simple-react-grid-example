import NameCellEditor from './NameCellEditor.jsx';
import RefData from './RefData';
import SkillsCellRenderer from './SkillsCellRenderer.jsx';
import SkillsFilter from './SkillsFilter.jsx';

export default class ColDefFactory {

  createColDefs () {
    let prev;
    const classHandler = (params) => {
      let res = document.createElement('div');
      res.innerHTML = params.value;
      res.addEventListener('click', function addClick () {
        res.classList.toggle('active-cell');
        if (prev) {
          prev.classList.remove('active-cell');
        }
        prev = res;
      });
      return res;
    };

    var columnDefs = [
      {
        headerName: 'Num',
        width: 45,
        field: 'number',
        suppressSorting: true,
        suppressMenu: true,
        pinned: true,
        cellRenderer: classHandler
      },
      {
        headerName: 'Employee',
        children: [
          {
            headerName: 'Name',
            field: 'name',
            enableRowGroup: true,
            enablePivot: true,
            width: 150,
            pinned: true,
            editable: true,
            // use a React cellEditor
            cellEditorFramework: NameCellEditor,
            cellRenderer: classHandler
          },
          {
            headerName: 'Country',
            field: 'country',
            width: 150,
            enableRowGroup: true,
            enablePivot: true,
            // an example of using a non-React cell renderer
            pinned: true,
            filterParams: { cellRenderer: countryCellRenderer, cellHeight: 20 },
            cellRenderer: classHandler
          }
        ]
      },
      {
        headerName: 'IT Skills',
        children: [
          {
            headerName: 'Skills',
            width: 125,
            suppressSorting: true,
            field: 'skills',
            enableRowGroup: true,
            enablePivot: true,
            // supply a React component
            cellRendererFramework: SkillsCellRenderer,
            // supply a React component
            filterFramework: SkillsFilter,
            cellRenderer: classHandler
          }
        ]
      },
      {
        headerName: 'Contact',
        children: [
          { headerName: 'Mobile', field: 'mobile', width: 150, filter: 'text', cellRenderer: classHandler },
          { headerName: 'Address', field: 'address', width: 500, filter: 'text', cellRenderer: classHandler }
        ]
      }
    ];
    return columnDefs;
  }
}

// this is a simple cell renderer, putting together static html, no
// need to use React for it.
function countryCellRenderer (params) {
  if (params.value) {
    var flag = "<img border='0' width='15' height='10' " +
      "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/" +
      RefData.COUNTRY_CODES[params.value] + ".png'>";
    return flag + ' ' + params.value;
  } else {
    return null;
  }
}
