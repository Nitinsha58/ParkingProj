import Nav from "../../my-app/src/Components/Nav";
import Main from "../../my-app/src/Components/Main";
import Footer from "../../my-app/src/Components/Footer";
import Register from "../../my-app/src/Components/Register";
import { Route, Routes } from "react-router-dom";
import User from "../../my-app/src/Components/User";



function App() {


	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<User />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
