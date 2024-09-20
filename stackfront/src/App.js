import logo from './logo.svg';
import './App.css';
import Login from './component/login'
import REG  from   './component/Register'
import Navbar from './component/navbar';
import Main from './component/Main';
import Textarea from './component/Textarea';
import {Routes, Route} from "react-router-dom"
import MainQuestion from './component/Mainquestion';
import QuestionState from './component/QuestionContext/QuestionState';

function App() {
  return (
    <div >
      <QuestionState>
       
       <Navbar/>
       <Routes>
        <Route exact path="/main" element={<Main/>}></Route>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/reg" element={<REG/>}></Route>

        <Route exact path="/askquestion" element={<Textarea/>}></Route>
        <Route exact path="/mainquestion" element={<MainQuestion/>}></Route>
       </Routes>
       {/* <Login/> */}

       {/* <REG/> */}
      
          {/* <Main/> */}
          {/* <Textarea></Textarea> */}

    </QuestionState>
    </div>
  );
}

export default App;
