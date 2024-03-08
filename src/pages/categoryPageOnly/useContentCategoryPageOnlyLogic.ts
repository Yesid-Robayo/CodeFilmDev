import { useNavigate } from "react-router-dom";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { useEffect, useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";

export const useContentCategoryPageOnlyLogic = (categoryKey: any) => {
    const styles = useStyles();
    const navigate = useNavigate();
    const labels = useLabels();
    const categoriesLabels: any = {
        action: labels.categoryAction,
        comedy: labels.categoryComedy,
        horror: labels.categoryHorror,
        drama: labels.categoryDrama,
        documentary: labels.categoryDocumentary,
        sciencefiction: labels.categoryScienceFiction,
        romance: labels.categoryRomance,
    };
    const [userVideos, setUserVideos] = useState<any[]>([]);
    useEffect(() => {
        getVideos();
    }, []);
    const getVideos = async () => {
        await FirestoreMethods.getAllStorage("videos").then((response) => {
            if (response.success) {
                setUserVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
    }
    const navigateToVideo = (videoId: string) => {
        navigate(`/video/${videoId}`);
    }
    const filterVideosByCategory = (category: string) => {
        return userVideos.filter(video => video.data.category === category);
    };
    const selectedCategoryLabel = categoriesLabels[categoryKey];



    return {
        filterVideosByCategory,
        styles,
        navigateToVideo,
        selectedCategoryLabel,
        labels,
    }

}