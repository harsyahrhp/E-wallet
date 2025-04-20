import Navbar from "../components/navbar";
import TransferConfirmation from "../components/TransferConfirmation";
import TransferForm from "../components/TransferForm";
import TransferPin from "../components/TransferPin";
import TransferStatus from "../components/TransferStatus";

const TransferPage = () => {

    return (
        <>
            <Navbar />
            {/* <TransferForm /> */}
            {/* <TransferConfirmation /> */}
            {/* <TransferPin /> */}
            <TransferStatus />
        </>

    );
};

export default TransferPage;