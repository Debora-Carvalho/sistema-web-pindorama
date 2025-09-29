import AppRoutes from "./routes/router.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
function App() {
	return (
		<div className="App">
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</div>
	)
}

export default App;
