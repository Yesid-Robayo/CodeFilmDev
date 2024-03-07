import { useEffect, useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";

export const UseVideosPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    const [activeTab, setActiveTab] = useState("add");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeTab]);
    const renderButtons = () => {
        switch (activeTab) {
            case "add":
                return (
                    <>
                        <button className="border-t-2 bg-white border-x-2 rounded-tl-3xl w-20 h-10" style={{ borderColor: styles.colors["blue-400"], color: styles.colors["blue-500"], fontFamily: styles.fonts.text }}>{labels.add}</button>
                        <button className="border-t-2 bg-white border-gray-300 w-20 h-10" style={{ fontFamily: styles.fonts.text }} onClick={() => setActiveTab("edit")}>{labels.edit}</button>
                        <button className="border-t-2 bg-white border-x-2 rounded-tr-3xl border-gray-300 w-20 h-10" style={{ fontFamily: styles.fonts.text }} onClick={() => setActiveTab("delete")}>{labels.delete}</button>
                    </>
                );
            case "edit":

                return (
                    <>
                        <button className="border-t-2 bg-white rounded-tl-3xl border-l-2 border-gray-300 w-20 h-10" style={{ fontFamily: styles.fonts.text }} onClick={() => setActiveTab("add")}>{labels.add}</button>
                        <button className="border-t-2 bg-white border-x-2 border-gray-300 w-20 h-10" style={{ borderColor: styles.colors["blue-400"], color: styles.colors["blue-500"], fontFamily: styles.fonts.text }} onClick={() => setActiveTab("edit")}>{labels.edit}</button>
                        <button className="border-t-2 bg-white border-r-2 rounded-tr-3xl border-gray-300 w-20 h-10" style={{ fontFamily: styles.fonts.text }} onClick={() => setActiveTab("delete")}>{labels.delete}</button>
                    </>
                );
            case "delete":

                return (
                    <>
                        <button className="border-t-2 bg-white rounded-tl-3xl border-x-2 border-gray-300 w-20 h-10" onClick={() => setActiveTab("add")} style={{ fontFamily: styles.fonts.text }}>{labels.add}</button>
                        <button className="border-t-2 bg-white border-gray-300 w-20 h-10" onClick={() => setActiveTab("edit")} style={{ fontFamily: styles.fonts.text }}>{labels.edit}</button>
                        <button className="border-t-2 bg-white border-x-2 rounded-tr-3xl border-gray-300 w-20 h-10" style={{ borderColor: styles.colors["blue-400"], color: styles.colors["blue-500"], fontFamily: styles.fonts.text }} onClick={() => setActiveTab("delete")}>{labels.delete}</button>
                    </>
                );
            default:
                return null;
        }

    };



    return {
        styles,
        labels,
        renderButtons,
        activeTab,
        useEffect
    }
}