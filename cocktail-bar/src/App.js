import React from "react";
import {CocktailRecommendationForm} from "./CocktailRecommendationForm";
import {ToastContainer} from "react-toastify";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Link} from "react-router-dom";
import {EventPlanningForm} from "./EventPlanningForm";

function RootLayout() {
    return <>
        <nav>
            <Link to={"/recommend"}>Recommend Cocktail</Link>
            <Link to={"/plan"}>Plan Event</Link>
        </nav>
        <main style={{display: "flex", justifyContent: "center", paddingTop: "3em" }}>
            <Outlet/>
        </main>

    </>
}


const router = createBrowserRouter(createRoutesFromElements(

    <Route path="" element={<RootLayout/>}>
        <Route path="recommend" element={<CocktailRecommendationForm/>}/>
        <Route path="plan" element={<EventPlanningForm/>}/>
    </Route>
))
function App() {

    return (<div>
        <RouterProvider router={router}/>
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
