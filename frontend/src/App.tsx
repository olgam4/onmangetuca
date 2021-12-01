import { ToastContainer } from 'react-toastify'

import Login from 'components/Login'
import Recipes from 'components/Recipes'

import useUser from 'hooks/useUser'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const { user } = useUser()
  return (
    <div className="App">
      {user ? <Recipes /> : <Login />}
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
