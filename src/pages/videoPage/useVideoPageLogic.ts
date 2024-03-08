import { useEffect, useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { shuffleArray } from "../../helpers/helpers";

export const useVideoPageLogic = (videoID: string) => {
    const labels = useLabels();
    const styles = useStyles();
    const [videoDetails, setVideoDetails] = useState<any>(null);
    const [relatedVideos, setRelatedVideos] = useState<any>([]);
    useEffect(() => {
        getVideoDetails();
        getRelatedVideos();
    }, [videoID]);
    const getVideoDetails = async () => {
        await FirestoreMethods.getStorageFile("videos", videoID).then((response) => {
            setVideoDetails(response.data);
        }).catch((error) => {
            console.error("Error buscando video:", error);
        });
    }
    const getRelatedVideos = async () => {
        try {
            const response = await FirestoreMethods.getAllStorage("videos");
            const allVideos = response.data;
            
            const filteredVideos = allVideos.filter((video: any) => video.id !== videoID);
    
            const shuffledVideos = shuffleArray(filteredVideos);
    
            // Establecer los videos relacionados aleatorios en el estado
            setRelatedVideos(shuffledVideos);
        } catch (error) {
            console.error("Error buscando videos relacionados:", error);
        }
    };
    return {
        labels,
        styles,
        relatedVideos,
        videoDetails
    }





}