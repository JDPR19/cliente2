import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Tasklist from './components/tasklist';
import Taskform from './components/taskform';
import Menu from './components/navbar';
import {Container} from '@mui/material'; 
import'./index.css';

function App() {
  
  return (
    <BrowserRouter>
    <Menu></Menu>
      <Container>
        <Routes>
          <Route path="/" element={<Tasklist />} />
          <Route path="/taskform" element={<Taskform />} />
          <Route path="/taskform/:id" element={<Taskform />} />
          <Route path="/tasks/:id/edit" element={<Taskform />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
