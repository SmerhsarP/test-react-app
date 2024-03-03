import { useState } from 'react';
import './App.css';

const getPeopleData = (event) => {
  const url = 'https://swapi.dev/api/people';

  return fetch(url, { method: 'GET' })
    .then(response => response.json());
}

const tableRendering = (data) => {
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
    </tr>
  ));
}

const App = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <div className="App">
      <div class="buttons-container">
        <button onClick={(event) => getPeopleData().then(data => setTableData(data.results))}>Сделать запрос</button>
        <button onClick={(event) => setTableData([])}>Очистить таблицу</button>
      </div>

      <table class="people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Hair Color</th>
            <th>Height</th>
            <th>Eye Color</th>
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
