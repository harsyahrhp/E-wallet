import Navbar from "../components/navbar";
import TransferConfirmation from "../components/TransferConfirmation";
import TransferForm from "../components/TransferForm";
import TransferPin from "../components/TransferPin";
import TransferStatus from "../components/TransferStatus";
import { useAuth } from "../contexts/Auth";

const TransferPage = () => {
    const { statusTransfer } = useAuth();

    return (
        <>
            <Navbar />
            {statusTransfer == "TransferForm" && <TransferForm />}
            {statusTransfer == "TransferConfirmation" && <TransferConfirmation />}
            {statusTransfer == "TransferPin" && <TransferPin />}
            {statusTransfer == "TransferStatus" && <TransferStatus />}
            {/* <TransferForm /> */}
            {/* <TransferConfirmation /> */}
            {/* <TransferPin /> */}
            {/* <TransferStatus /> */}
        </>

    );
};

export default TransferPage;