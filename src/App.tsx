import LoginView from "./views/LoginView";
import { useClient } from "./hooks/useClient";
// import HomeView from "./views/HomeView";
import NewConversationView from "./views/NewConversationView";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

function App() {
  const client = useClient();

  return client ? <NewConversationView /> : <LoginView />;
}

export default App;
