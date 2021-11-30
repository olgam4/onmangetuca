import Login from 'components/Login'
import Recipes from 'components/Recipes'
import { ToastContainer } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <div className="App">
      <Login />
      <Recipes />
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
  );
}

export default App;
