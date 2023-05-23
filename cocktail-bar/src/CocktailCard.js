import {capitalize} from "./Util";

export function CocktailCard(props) {
    const {cocktail} = props;


    const flavors = [...new Set(cocktail.ingredients.map((ingredient) => ingredient.flavor))].filter(flavor => flavor !== 'NEUTRAL').slice(0, 4);

    return (<div className="cocktail-card">
        <img src={cocktail.image} alt={cocktail.name}/>
        <div className="title">{cocktail.name}</div>

        <div className="ingredients">
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

    </div>)
}