
import './App.css'
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import {Route, Routes} from "react-router-dom";
import NewQuote from "./containers/NewQuote/NewQuote.tsx";
import Quotes from "./containers/Quotes/Quotes.tsx";

const App = () => {
  return (
    <>
      <header>
          <Toolbar/>
      </header>
        <main  className="container-fluid">
            <Routes>
                <Route path="/" element={<Quotes/>}/>
                <Route path="/new-quote" element={<NewQuote/>}/>
                <Route path="/web_quotes/:categoryId" element={<Quotes/>}/>
                <Route path="/*" element={<h1>Not Found</h1>}/>
            </Routes>
        </main>
    </>
  )
};

export default App
