import { Header } from "../components/HeaderComponent"
import NavBar from "../components/NavBar"
import Login from "./Login"
import { useState } from "react"


const HomePage = ({showLogin, setShowLogin}) => {
    
    return (
        <>
        <NavBar showLogin={showLogin} setShowLogin={setShowLogin}/>
        <div className="container">
            <div id="Header" className="h-screen text-white text-center place-content-center flex flex-col items-center">
                <div className="w-1/2">
                    <h1 className="pb-10 text-5xl"> Texto de ejemplo</h1>
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique eget massa vel pellentesque. Ut vel sagittis dui, sit amet sagittis dui. Vestibulum consequat at massa a sodales.</p>
                    <button className="bg-green-600 mt-5 px-10 py-2 rounded-full hover:bg-green-700">Get Started</button>
                </div>
            </div>
        </div>        
        </>
    )
}
export default HomePage