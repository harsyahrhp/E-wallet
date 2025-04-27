import NavbarPage from "../components/NavbarPage";
import TransferConfirmation from "../components/TransferConfirmation";
import TransferForm from "../components/TransferForm";
import TransferPin from "../components/TransferPin";
import TransferStatus from "../components/TransferStatus";
import { useAuth } from "../contexts/Auth";

const TransferPage = () => {
    const { statusTransfer } = useAuth();

    return (
        <>
            <NavbarPage />
            <div className="min-h-screen bg-white dark:bg-black">
                {statusTransfer == "TransferForm" && <TransferForm />}
                {statusTransfer == "TransferConfirmation" && <TransferConfirmation />}
                {statusTransfer == "TransferPin" && <TransferPin />}
                {statusTransfer == "TransferStatus" && <TransferStatus />}
            </div>

        </>

    );
};

export default TransferPage;