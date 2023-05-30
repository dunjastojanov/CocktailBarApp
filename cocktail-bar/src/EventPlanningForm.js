import {useContext, useState} from "react";
import axios from "axios";
import {CocktailCard} from "./CocktailCard";
import {toast} from "react-toastify";
import {AlarmContext, EventTypeContext} from "./App";

export function EventPlanningForm() {

    const {eventType, setEventType} = useContext(EventTypeContext)
    const {alarms, setAlarms} = useContext(AlarmContext)


    const [data, setData] = useState({
        male: 80,
        female: 20,
        hours: 3,
        type: "BIRTHDAY"
    });

    const [ingredients, setIngredients] = useState([])
    const [menu, setMenu] = useState([])

    const handleChange = (e, name) => {
        setData({...data, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let dto = {
            maleGuestAmount: data.male,
            femaleGuestAmount: data.female,
            eventHours: data.hours,
            eventType: data.type
        }

        axios.post("http://localhost:8080/event/plan", dto).then(
            res => {
                setIngredients(res.data.ingredients);
                setMenu(res.data.cocktails);
                setEventType(res.data.eventType);
                toast.success("You successfully ordered a cocktail.");
            }
        ).catch(err => toast.error(err.message))
    }

    return (<div>

        {ingredients.length === 0 && menu.length === 0 &&
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

                    <div>
                        <label>Event Type</label>
                        <select name="type" value={data.type} onChange={(e) => handleChange(e, "type")}>
                            <option value=""/>
                            <option label="Birthday" value={"BIRTHDAY"}/>
                            <option label="Business" value={"BUSINESS"}/>
                            <option label="Wedding" value={"WEDDING"}/>
                            <option label="Bachelorette party" value={"BACHELORETTE_PARTY"}/>
                            <option label="Bachelor party" value={"BACHELOR_PARTY"}/>
                        </select>

                    </div>
                </div>
                <div className="button-container">
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </form>
        }

        {alarms.length > 0 && <div className="alarm-container">Out of: {alarms.map(alarm => {
            return <div>{alarm}</div>
        })}</div>}

        <div className="even-plan">

            {menu.length > 0 && <div className="cocktail-container">
                {menu.map((cocktail, index) => {
                    return <CocktailCard key={index} cocktail={cocktail} canOrder={true} setCocktails={setMenu}/>
                })}
            </div>}

            {ingredients.length > 0 && <div className="ingredient-container">

                {ingredients.map((ingredient, index) => {
                    return <div key={index} className="ingredient-card">
                        <div className="title">{ingredient.ingredient}</div>
                        <div>{+ingredient.amount / 1000}l</div>
                    </div>
                })}

            </div>}

        </div>


    </div>)
}