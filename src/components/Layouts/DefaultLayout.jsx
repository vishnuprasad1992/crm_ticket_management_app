import Header from "./partials/Header";
import Footer from "./partials/Footer";
import "./partials/css/main.css"


const DefaultLayout = ({children}) => {
    return (
        <div>
            <Header/>
            <main className="main-content" >
               {children}
            </main>
            <Footer/>
        </div>
    )
}

export default DefaultLayout
