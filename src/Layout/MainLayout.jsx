import { Outlet } from "react-router-dom";


const MainLayout = () => {
	return (
		<div className="max-w-screen-2xl mx-auto">
			<Outlet/>
		</div>
	);
};

export default MainLayout;