import React from "react";
import {CocktailRecommendationForm} from "./CocktailRecommendationForm";
import {ToastContainer} from "react-toastify";

function App() {

    return (<div>
        <nav>
            <h1>Recommend a cocktail</h1>
        </nav>

        <main style={{display: "flex", justifyContent: "center", paddingTop: "3em" }}>

            <CocktailRecommendationForm/>
        </main>

        <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
        />
    </div>);
}

export default App;
