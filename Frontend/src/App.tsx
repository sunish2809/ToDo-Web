import { Outlet } from 'react-router-dom';
import Left from './components/Left';
import Right from './components/Right';
import './App.css';


function App() {
  return (
    <div className='app-main'>
      <Left />
      <Right>
        <Outlet /> 
      </Right>
    </div>
  );
}

export default App;

