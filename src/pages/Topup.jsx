import Navbar from "../components/navbar";
import TopupForm from "../components/TopupForm";
import TopupMethod from "../components/TopupMethod";
import TopupConfirmation from "../components/TopupConfirmation";
import TopupStatus from "../components/TopupStatus";
import { useAuth } from "../contexts/Auth";

const TopupPage = () => {
    const { statusTopup } = useAuth();

    console.log(statusTopup)
    return (
        <>
            <Navbar />
            {statusTopup == "TopupForm" && <TopupForm />}
            {statusTopup == "TopupMethod" && <TopupMethod />}
            {statusTopup == "TopupConfirmation" && <TopupConfirmation />}
            {statusTopup == "TopupStatus" && <TopupStatus />}
        </>
    );
};

export default TopupPage;