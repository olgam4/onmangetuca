import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import useAuth from 'hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Logout from 'components/Logout'

function App() {
  const { authed } = useAuth()
  return (
    <div className="App">
      <div className="content">
        <Outlet />
      </div>
      {authed && (
        <nav>
          <Logout/>
          <Link to="/recipes">Recipes</Link>
        </nav>
        )}
      <div className="toast">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default App;
