import { Provider } from "react-redux"
import { Game } from "./components/Game"
import { BottomBar } from "./components/UI/BottomBar"
import { store } from "./store/store"


const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Game />
        <BottomBar />
      </div>
    </Provider>
  )
}

export default App
