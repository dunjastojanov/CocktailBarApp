import {useState} from "react";
import axios from "axios";
import {CocktailCard} from "./CocktailCard";

export function EventPlanningForm() {
    const [data, setData] = useState({
        male: 0,
        female: 0,
        hours: 0
    });

    const [ingredients, setIngredients] = useState([])
    const [cocktails, setCocktails] = useState([])

    const handleChange = (e, name) => {
        setData({...data, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let dto = {
            maleGuestAmount : data.male,
            femaleGuestAmount: data.female,
            eventHours: data.hours
        }

        axios.post("http://localhost:8080/event/plan/1", dto).then(
            res => {
                console.log(res.data);
                setIngredients(res.data.ingredients);
                setCocktails(res.data.cocktails);
            }
        )
    }

    return (<div>

        {ingredients.length === 0 && cocktails.length === 0 &&
            <form>
                <div className="event-form">
                    <div>
                        <label>Female guest count</label>
                        <input type="number" name="female" step={10} value={data.female} onChange={(e) => {
                            handleChange(e, "female")
                        }}/>
                    </div>
                    <div>
                        <label>Male guest count</label>
                        <input type="number" name="male" step={10} value={data.male} onChange={(e) => {
                            handleChange(e, "male")
                        }}/>
                    </div>
                    <div>
                        <label>Event hours</label>
                        <input type="number" name="hours" value={data.hours} onChange={(e) => {
                            handleChange(e, "hours")
                        }}/>

                    </div>
                </div>
                <div className="button-container">
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </form>
        }

        <div className="even-plan">


            {cocktails.length > 0 && <div className="cocktail-container">
                {cocktails.map((cocktail, index) => {
                    return <CocktailCard key={index} cocktail={cocktail}/>
                })}
            </div>}

            {ingredients.length > 0 && <div className="ingredient-container">

                {ingredients.map((ingredient, index) => {
                    return <div key={index} className="ingredient-card">
                        <div className="title">{ingredient.ingredient}</div>
                        <div>{+ingredient.amount/1000}l</div>
                    </div>
                })}

            </div>}

        </div>





    </div>)
}