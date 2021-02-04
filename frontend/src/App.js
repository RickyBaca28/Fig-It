import logo from './logo.svg';
import './App.css';
import Login from './components/Authentication/Login';

function App() {
  return (
    <div className="Login">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Login/>
      </header>
    </div>
  );
}

export default App;
