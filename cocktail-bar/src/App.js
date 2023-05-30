import React, {createContext, useContext, useEffect, useState} from "react";
import {CocktailRecommendationForm} from "./CocktailRecommendationForm";
import {createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider} from "react-router-dom";
import {EventPlanningForm} from "./EventPlanningForm";
import {capitalize} from "./Util";

function RootLayout() {

    const {eventType} = useContext(EventTypeContext)
    return <>
        <nav>
            {eventType && <Link>{capitalize(eventType.replace("_", " "))}</Link>}
            <Link to={"/recommend"}>Recommend Cocktail</Link>
            <Link to={"/plan"}>Plan Event</Link>
        </nav>
        <main style={{display: "flex", justifyContent: "center", paddingTop: "3em"}}>
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


export const EventTypeContext = createContext({
    eventType: "", setEventType: null
});

export const AlarmContext = createContext({
    alarms: [], setAlarms: null
})

function App() {

    const [eventType, setEventType] = useState("");
    const [alarms, setAlarms] = useState([])

    return (
        <AlarmContext.Provider value={{alarms: alarms, setAlarms: setAlarms}}>
            <EventTypeContext.Provider value={{eventType: eventType, setEventType: setEventType}}>
                <RouterProvider router={router}/>
            </EventTypeContext.Provider>
        </AlarmContext.Provider>);
}
export default App;
