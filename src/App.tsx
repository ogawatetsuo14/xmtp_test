import LoginView from "./views/LoginView";
import { useClient } from "./hooks/useClient";
// import HomeView from "./views/HomeView";
import NewConversationView from "./views/NewConversationView";

function App() {
  const client = useClient();

  return client ? <NewConversationView /> : <LoginView />;
}

export default App;
