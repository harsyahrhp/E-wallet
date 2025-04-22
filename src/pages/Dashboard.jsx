import Navbar from "../components/navbar";
import { useState, useEffect } from "react";

const DashboardPage = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const thirtyDaysAgo = new Date(dateTime);
    thirtyDaysAgo.setDate(dateTime.getDate() - (dateTime.getDate()-1));

    const formattedStartDate = thirtyDaysAgo.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const formattedEndDate = dateTime.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return (
        <>
            <Navbar />
            <p>
                {formattedStartDate} - {formattedEndDate}
            </p>
        </>
    );
};

export default DashboardPage;
