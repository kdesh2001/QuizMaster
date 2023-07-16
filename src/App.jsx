import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import Score from "./components/Score";

function App() {
  return (
  <div>
    <div className="title" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '2% auto'
        }}>
            <h1>QuizMaster</h1>
        </div>
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/play" element={<Play />} />
       <Route path="/score" element={<Score />} />
     </Routes> 
   </div>
  );
}

export default App;
