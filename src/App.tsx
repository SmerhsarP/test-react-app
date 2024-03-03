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

const App = () => {
  const [tableData, setTableData] = useState<Array<Person>>([]);
  const [isLoading, setLoader] = useState<Boolean>(false);

  const tableRendering = (data: Array<Person>) => {
    if (data.length === 0) {
      if ((JSON.parse(localStorage.getItem('table') || '[]')).length > 0) {
        setTableData(JSON.parse(localStorage.getItem('table') || '[]') as Array<Person>);
      }
      return (<tr><td colSpan={5}>Загрузите данные</td></tr>)
    }

    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.gender}</td>
        <td>{row.hair_color}</td>
        <td>{row.height}</td>
        <td>{row.eye_color}</td>
        <td className="delete-icon" onClick={() => deleteRow(index)}>+</td>
      </tr>
    ));
  }

  const loaderRender = () => {
    return (<tr><td className='loader' colSpan={5}>#</td></tr>)
  }

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

    // Пришлось делать костыль со slice для того, чтобы обновлялась верстка. Если закидывать тупо tableData, то он ничего не меняет.
    setTableData(tableData.sort(compare).slice(0));
  }

  const deleteRow = (index: any) => {
    const isDelete = window.confirm(`Удалить ${tableData[index].name}?`);

    if (isDelete) {
      tableData.splice(index, 1);
      // Пришлось делать костыль со splice для того, чтобы обновлялась верстка. Если закидывать тупо tableData, то он ничего не меняет.
      setTableData(tableData.slice(0));
      localStorage.setItem('table', JSON.stringify(tableData));
    }
  }

  return (
    <div className="App">
      <div className="buttons-container">
        <button onClick={(event) => {
          getPeopleData().then(data => {
            setLoader(false);
            setTableData(data.results);
            localStorage.setItem('table', JSON.stringify(data.results));
          });
          setLoader(true);
        }}>Сделать запрос</button>
        <button onClick={(event) => {
          setTableData([]);
          localStorage.setItem('table', JSON.stringify([]));
        }}>Очистить таблицу</button>
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
          {isLoading ? loaderRender() : tableRendering(tableData)}
        </tbody>
      </table>
    </div >
  );
}

export default App;
