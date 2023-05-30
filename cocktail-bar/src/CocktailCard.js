import {capitalize} from "./Util";
import axios from "axios";
import {toast} from "react-toastify"
import {useContext} from "react";
import {AlarmContext, EventTypeContext} from "./App";

export function CocktailCard(props) {
    const {eventType, setEventType} = useContext(EventTypeContext)
    const {cocktail, canOrder = false, setCocktails = null} = props;

    const {alarms, setAlarms} = useContext(AlarmContext)

    function order() {


        function getParams() {
            let params = {cocktailName: cocktail.name};
            if (eventType) {
                params.eventType = eventType;
            }
            return params;
        }

        axios.get('http://localhost:8080/order?', {params: getParams()}).then(res => {
            setAlarms([...new Set(res.data.alarms.map(alarm => {
                return alarm.ingredientName
            }))])
            setEventType(res.data.eventType)

            if (setCocktails && res.data.cocktails) {
                setCocktails(res.data.cocktails)
            }
        }).catch(
            err => {
                toast.error(err.message);
            }
        )
    }

    const flavors = [...new Set(cocktail.ingredients.map((ingredient) => ingredient.flavor))].filter(flavor => flavor !== 'NEUTRAL').slice(0, 4);

    return (<div className="card-container">
        {canOrder &&
            <button className="order" onClick={order}>
                Order
            </button>}

        <div className="cocktail-card">
            <img src={cocktail.image} alt={cocktail.name}/>
            <div className="title">
                {cocktail.name}
            </div>


            <div className="ingredients">
                <h6>{capitalize(cocktail.glass.replace("_", " "))}</h6>
                <h3>Ingredients</h3>
                {cocktail.ingredients.map((ingredient, index) => {
                    return (<div key={index}>
                        {ingredient.name}
                    </div>)
                })}

                <div className="flavors">
                    {flavors.map((flavor, index) => {
                        return (<div key={index}>{capitalize(flavor)}</div>)
                    })}
                </div>


            </div>


            <div className="strength">
                {cocktail.alcoholStrength === "LIGHT" && <div>
                    <img src={require("./images/bottle.png")} alt={"bottle"}/>
                </div>}
                {cocktail.alcoholStrength === "MEDIUM" && <div>
                    <img src={require("./images/bottle.png")} alt={"bottle"}/>
                    <img src={require("./images/bottle.png")} alt={"bottle"}/>
                </div>}
                {cocktail.alcoholStrength === "STRONG" &&

                    <div>
                        <img src={require("./images/bottle.png")} alt={"bottle"}/>
                        <img src={require("./images/bottle.png")} alt={"bottle"}/>
                        <img src={require("./images/bottle.png")} alt={"bottle"}/>
                    </div>}
            </div>

        </div>


    </div>)
}