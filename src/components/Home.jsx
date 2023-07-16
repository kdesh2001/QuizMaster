

import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const categories=[{"id":0,"name":"All"},{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},
{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},
{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},
{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},
{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}];




function Home(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: '',
        difficulty: '',
        num: '10'
      });
      const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate('/play/', { state: formData });
      };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name,value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    return(
        <div>
        
        <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '4% auto',
            height: '70vh',
            width: '40vw',
            border: '1px solid #63696f',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            <form onSubmit={handleFormSubmit} style={{
                width: '80%',
                maxWidth: '500px'
            }}>
                <div className="form-group">
                <label htmlFor="category">Select a category</label>
                <select className="form-control" name="category" id="category" onChange={handleInputChange}>
                    {
                        categories.map((c, index)=>(
                            <option key={index} value={c.id}>{c.name}</option>
                        ))
                    }
                </select>
                </div>
                <br />
                <br />
                <br />
                <div className="form-group">
                <label htmlFor="difficulty">Select a difficulty</label>
                <select className="form-control" name="difficulty" id="difficulty" onChange={handleInputChange}>
                    <option value="default">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>
                <br />
                <br />
                <br />
                <div className="form-group">
                <label htmlFor="number">Enter number of questions</label>
                <input className="form-control" type="number" name="num" id="num" defaultValue={10} onChange={handleInputChange} />
                </div>
                <br />
                <br />
                <br />
                <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
        </div>
        </div>
    );
}

export default Home;