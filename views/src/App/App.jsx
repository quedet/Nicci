import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { CreatePage, HomePage } from '../Pages'

const App = () => {
    return (
        <div className='nicci--app'>
            <Router>
                <div className="app--wrapper">
                    <header className="app--header">
                        <div className="app--header--wrapper">
                            <Navbar />
                        </div>
                    </header>
                    <main className="app--content">
                        <div className="app--content--wrapper">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/create" element={<CreatePage />} />
                            </Routes>
                        </div>
                    </main>
                    <footer className="app--footer">
                        <div className="app--footer--wrapper">

                        </div>
                    </footer>
                </div>
            </Router>
        </div>
    )
}

export default App