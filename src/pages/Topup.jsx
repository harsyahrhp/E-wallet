import NavbarPage from "../components/NavbarPage";
import TopupForm from "../components/TopupForm";
import TopupMethod from "../components/TopupMethod";
import TopupConfirmation from "../components/TopupConfirmation";
import TopupStatus from "../components/TopupStatus";
import { useAuth } from "../contexts/Auth";

const TopupPage = () => {
    const { statusTopup } = useAuth();

    return (
        <>
            <NavbarPage />
            <div className="min-h-screen bg-white dark:bg-black">
                {statusTopup == "TopupForm" && <TopupForm />}
                {statusTopup == "TopupMethod" && <TopupMethod />}
                {statusTopup == "TopupConfirmation" && <TopupConfirmation />}
                {statusTopup == "TopupStatus" && <TopupStatus />}
            </div>
        </>
    );
};

export default TopupPage;