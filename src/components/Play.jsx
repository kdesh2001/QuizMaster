// sample api call url: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Question from "./question";

import 'bootstrap/dist/css/bootstrap.min.css';

function Play(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state;
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

    const handleAnswerSelection = (questionIndex, option) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
          ...prevSelectedAnswers,
          [questionIndex]: option,
        }));
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiUrl = `https://opentdb.com/api.php?amount=${formData.num}&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
    
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            setQuestions(data.results.map((question) => {
                const options = [...question.incorrect_answers, question.correct_answer];
                const shuffledOptions = shuffleArray(options);
                return {
                  ...question,
                  options: shuffledOptions,
                };
              }));
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [formData]);

      const handleFormSubmit = (event) => {
        event.preventDefault();
        let score = 0;
        questions.forEach((question, index) => {
          const selectedOptionIndex = selectedAnswers[index];
          if (selectedOptionIndex === question.correct_answer) {
            score++;
          }
        });
    
        navigate('/score/', { state: { score: score, total: formData.num} });
      };

    return(
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                {questions.map((question, index) => (
                    <Question key={index} index={index} question={question} selectedAnswers={selectedAnswers} handleAnswerSelection={handleAnswerSelection}/>
                ))}
            <div className="submit-button" style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                marginBottom: '100px'
            }}>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
            </form>
        </div>
    );
}

export default Play;