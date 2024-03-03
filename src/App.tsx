import { useState } from 'react';
import './App.css';

type Person = {
  name: String,
  gender: String,
  hair_color: String,
  height: String,
  eye_color: String,
};

type ObjectKey = keyof Person;

const getPeopleData = () => {
  const url = 'https://swapi.dev/api/people';

  return fetch(url, { method: 'GET' })
    .then(response => response.json());
}

const deleteRow = () => {
  return '';
}

const tableRendering = (data: Array<Person>) => {
  if (data.length === 0) {
    return (<tr><td colSpan={5}>Загрузите данные</td></tr>)
  }

  return data.map(row => (
    <tr>
      <td>{row.name}</td>
      <td>{row.gender}</td>
      <td>{row.hair_color}</td>
      <td>{row.height}</td>
      <td>{row.eye_color}</td>
      <td className="delete-icon" onClick={deleteRow}>+</td>
    </tr>
  ));
}

const App = () => {
  const [tableData, setTableData] = useState([]);

  const sortTableBy = (columnName: ObjectKey) => {
    const compare = (a: Person, b: Person) => {
      if (a[columnName] < b[columnName]) {
        return -1;
      }
      if (a[columnName] > b[columnName]) {
        return 1;
      }
      return 0;
    }

    console.log(columnName, tableData.sort(compare).map(item => item[columnName]));

    setTableData(tableData.sort(compare));
    debugger;
  }

  return (
    <div className="App">
      <div className="buttons-container">
        <button onClick={(event) => getPeopleData().then(data => setTableData(data.results))}>Сделать запрос</button>
        <button onClick={(event) => setTableData([])}>Очистить таблицу</button>
      </div>

      <table className="people-table">
        <thead>
          <tr>
            <th onClick={() => sortTableBy('name')}>Name</th>
            <th onClick={() => sortTableBy('gender')}>Gender</th>
            <th onClick={() => sortTableBy('hair_color')}>Hair Color</th>
            <th onClick={() => sortTableBy('height')}>Height</th>
            <th onClick={() => sortTableBy('eye_color')}>Eye Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableRendering(tableData)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
