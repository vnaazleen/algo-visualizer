import { Component } from 'react';
import './App.css';
import GridBlock from './Components/GridBlockComponent'; 
import GridLayout from './Components/GridLayoutComponent';

function App () {
    return (
      <div className="App">
{/*         
        <button onClick={this.setState({
                            k: this.state.k+1
                            })} > Clear Grid </button> */}

        <GridLayout ></GridLayout>

      </div>
    );
  
}

export default App;
