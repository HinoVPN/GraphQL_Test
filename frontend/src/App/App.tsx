import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from '../Navbar/NavBar';
import { gql, useQuery } from '@apollo/client';

const me = gql`
    query {
        me{
            _id
        }
    }
`

function App() {

  let {data} = useQuery(me)

  return (
    <div className="App">
      <link rel="icon" type="image/x-icon" href="https://img.icons8.com/pastel-glyph/512/000000/box--v1.png"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"/>
        <NavBar user={data?.me}/>
    </div>
  );
}

export default App;
