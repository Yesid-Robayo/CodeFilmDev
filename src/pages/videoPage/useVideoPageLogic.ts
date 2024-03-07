import { useEffect, useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { FirestoreMethods } from "../../services/fireBaseMethods";

export const useVideoPageLogic = (videoID: string) => {
    const labels = useLabels();
    const styles = useStyles();
    const [videoDetails, setVideoDetails] = useState<any>(null);
    useEffect(() => {
        getVideoDetails();
    }, []);
    const getVideoDetails = async () => {
        await FirestoreMethods.getStorageFile("videos", videoID).then((response) => {
            setVideoDetails(response.data);
            console.log("response", response);
        }).catch((error) => {
            console.error("Error buscando video:", error);
        });
    }
    return {
        labels,
        styles,
        videoDetails
    }





}