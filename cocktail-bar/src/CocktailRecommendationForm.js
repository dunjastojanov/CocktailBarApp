import {useState} from "react";
import {capitalize} from "./Util";
import {glasses} from "./Glasses";
import {flavors} from "./Flavors";
import axios from "axios";
import {toast} from "react-toastify";

export function CocktailRecommendationForm() {

    const [step, setStep] = useState(0);

    const [selectedGlass, setSelectedGlass] = useState(null)
    const [selectedAlcoholStrength, setSelectedAlcoholStrength] = useState(null)
    const [selectedFlavors, setSelectedFlavors] = useState([])

    const [cocktails, setCocktails] = useState([])


    const transform = (data) => {
        return data.toString().toUpperCase().replaceAll(" ", "_");
    }
    const submit = async (e) => {
        e.preventDefault();

        let dto = {
            glass: transform(selectedGlass),
            alcoholStrength: transform(selectedAlcoholStrength),
            flavors: selectedFlavors.map(flavor => transform(flavor))
        }

        axios.post("http://localhost:8080/cocktail/recommendation/" + 1, dto).then(result => {
            if (result.data.length === 0) {
                toast.info("No recommendations for given specifications")
            }
            setCocktails(result.data)
        }).catch(err => {
            toast.error(err)
        })
    }

    const handleSetGlass = (name) => {
        if (selectedGlass === name) {
            setSelectedGlass(null)
        } else {
            setSelectedGlass(name)
            setStep(step + 1)
        }
    }

    const handleAlcoholStrength = (name) => {
        if (selectedAlcoholStrength === name) {
            setSelectedAlcoholStrength(null)
        } else {
            setSelectedAlcoholStrength(name)
            setStep(step + 1)
        }
    }
    const handleSetFlavors = (name) => {
        if (selectedFlavors.includes(name)) {
            setSelectedFlavors(selectedFlavors.filter(flavor => flavor !== name))
        } else {
            setSelectedFlavors([...selectedFlavors, name])
        }
    }

    return <div>

        {cocktails.length === 0 ? <form className="recommendation-form">

            <div className="step-container">

                {[0, 1, 2].map(i => {
                    return (<button className={step === i ? "step-tracker active" : "step-tracker"} onClick={(e) => {
                        e.preventDefault();
                        setStep(i)
                    }}></button>)
                })}

            </div>
            {step === 0 && <div>
                {glasses.map((glass, index) => {
                    return (<PreferenceButton key={index} selected={glass === selectedGlass}
                                              handleClick={handleSetGlass}
                                              name={glass} image={true}/>)
                })}
            </div>}

            {step === 1 && <div>
                {["LIGHT", "MEDIUM", "STRONG"].map((strength, index) => {
                    return (<PreferenceButton key={index} selected={strength === selectedAlcoholStrength}
                                              handleClick={handleAlcoholStrength}
                                              name={strength} image={true}/>)
                })}
            </div>}

            {step === 2 && <div>
                {flavors.map((flavor, index) => {
                    return (<PreferenceButton key={index} selected={selectedFlavors.includes(flavor)}
                                              handleClick={handleSetFlavors}
                                              name={flavor} image={true}/>)
                })}
            </div>}

            <div className="button-container">
                {step > 0 && <button onClick={(e) => {
                    e.preventDefault();
                    setStep(step - 1)
                }}>Previous</button>}
                {step < 2 && <button onClick={(e) => {
                    e.preventDefault();
                    setStep(step + 1)
                }}>Next</button>}
                {step === 2 && <button onClick={(e) => {
                    submit(e)
                }}>Submit</button>}
            </div>
        </form> : <div className="cocktail-container">
            {cocktails.map((cocktail, index) => {
                return (<CocktailCard key={index} cocktail={cocktail}/>)
            })}
        </div>}

    </div>
}


function CocktailCard(props) {
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

function PreferenceButton(props) {
    const {selected, handleClick, name, image} = props


    return (<button className={selected ? "preference-button selected" : "preference-button"}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(name, true);
                    }}>
        <div>
            {!!image && <img src={require(`./images/${name.replaceAll(" ", "_").toLowerCase()}.jpg`)}
                             alt={name}/>}
            <div className="title">{capitalize(name)}</div>
            <div className="decor">.</div>

        </div>
    </button>)
}


