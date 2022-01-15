import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { AuthContextProvider } from '../Context/AuthProvider'
import { CreatePage, HomePage, InfoPage, UpdatePage } from '../Pages'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Signup/SignUp'

const App = () => {
    return (
        <AuthContextProvider>
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
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/create" element={<CreatePage />} />
                                    <Route path="/details/:id" element={<InfoPage />} />
                                    <Route path="/details/:id/update" element={<UpdatePage />} />
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
        </AuthContextProvider>
    )
}

export default App