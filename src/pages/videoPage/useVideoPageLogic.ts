import { useEffect, useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { shuffleArray } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

export const useVideoPageLogic = (videoID: string) => {
    const labels = useLabels();
    const styles = useStyles();
    const [videoDetails, setVideoDetails] = useState<any>(null);
    const [relatedVideos, setRelatedVideos] = useState<any>([]);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        getVideoDetails();
        getRelatedVideos();
    }, [videoID]);
    const categoriesLabels: any = {
        action: labels.categoryAction,
        comedy: labels.categoryComedy,
        horror: labels.categoryHorror,
        drama: labels.categoryDrama,
        documentary: labels.categoryDocumentary,
        sciencefiction: labels.categoryScienceFiction,
        romance: labels.categoryRomance,
    };

    const navigateToVideo = (videoID: string) => {
        navigate(`/video/${videoID}`);
    }
    const getVideoDetails = async () => {
        setVideoDetails(null);
        await FirestoreMethods.getStorageFile("videos", videoID).then((response) => {

            if (response.data) {
                const createdAt = response.data.createdAt.toDate();
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = createdAt.toLocaleDateString('es-ES', options);
                setVideoDetails({
                    ...response.data,
                    category: categoriesLabels[response.data.category],
                    createdAt: formattedDate
                });
            }

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
        navigateToVideo,
        relatedVideos,
        videoDetails
    }





}