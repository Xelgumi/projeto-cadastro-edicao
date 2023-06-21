import './App.css';
import './bootstrap.css';
import Principal from './components/Principal';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <header className="App-header col">
            <h1>Cadsystem</h1>
          </header>
          <Principal />
        </div>
      </div>
    </div>
  );
}

export default App;