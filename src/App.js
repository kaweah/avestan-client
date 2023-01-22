/*
 * React REST client that uses Axios
 */

import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// This doesn't fix "React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array"
// import ReactDOM from 'react-dom/client'
import axios from "axios";
import SearchBar from './SearchBar';

// react-table
import { useMemo } from 'react'; // memorize our column's value so it doesn't get called on every render.
import { useTable } from 'react-table';
import { COLUMNS } from './components/columns';
// import request from 'graphql-request';

function App() {
  // Declare React state variable ("hook") and set function
  const [words, setWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  // React-table support (temporary for debugging)
  const [data, setData] = useState([]);

  // To search with REST (server-side), use '/wordByDef' and then GET with '?def=water'

  const client = axios.create({
    baseURL: "/getAll" 
  });

  // GET with Axios (sync)
  useEffect(() => {
    client.get('').then((response) => {
      const words = response.data;

      setAllWords(words); // unfiltered data
      setWords(words); // data to be filtered
      setData(words); // data to be filtered
      setError(null);
      // if I've just assigned the state, why do I then have to set it?
      // Maybe 'words' here is not the state variable.
    });
  }, []);

  // react-table support

  const columns = useMemo(() => COLUMNS, []);

  // replace both instances of 'data' with 'words' to activate
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

  // Search handler (called whenever text in search bar changes)

  const updateKeyword = (keyword) => {
    const filtered = allWords.filter(word => {
       return `${word.old.toLowerCase()} ${word.definitions.toLowerCase()}`.includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setWords(filtered);
  }

  // Output to client

  return (

    <div className="App">
      <div className="App-header">
        <h1> GET data: </h1>
        <SearchBar keyword={keyword} onChange={updateKeyword}/>
      </div>
      <div className="left-bar"></div>
      <div className="App-data">

        <table {...getTableProps()}>
          <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <table className="list-group">
          <tr className = "list-group-item" ><td>Old Avestan</td><td>Younger Avestan</td><td>Definitions</td></tr>

        {words.map((data) => {
          return(
            <tr className = "list-group-item" key={data.id}><td>{data.old}</td><td>{data.younger}</td><td>{data.definitions}</td></tr>
          )
        })}

      </table>
      </div>
      <div className="right-bar"></div>
      <div className="App-footer"><h1>Footer</h1></div>
    </div>
  );
}

export default App;
