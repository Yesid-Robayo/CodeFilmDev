import { useEffect, useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useNavigate } from "react-router-dom";

export const useContentCategoryPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const navigate = useNavigate();
    const filterVideosByCategory = (category: string) => {
        return userVideos.filter(video => video.data.category === category);
    };

    const navigateToVideo = (videoId: string) => {
        navigate(`/video/${videoId}`);
    }
    const navigateToCategory = (categoryKey: string) => {
        navigate(`/category/${categoryKey}`);
    };
    const categoriesLabels: any = {
        action: labels.categoryAction,
        comedy: labels.categoryComedy,
        horror: labels.categoryHorror,
        drama: labels.categoryDrama,
        documentary: labels.categoryDocumentary,
        sciencefiction: labels.categoryScienceFiction,
        romance: labels.categoryRomance,
    };


    const getVideos = async () => {
        await FirestoreMethods.getAllStorage("videos").then((response) => {
            if (response.success) {
                setUserVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
    };

    useEffect(() => {
        getVideos();
    }, []);


    const categoriesWithVideos = Object.keys(categoriesLabels).filter(categoryKey => filterVideosByCategory(categoryKey).length > 0);
    const categoriesWithoutVideos = Object.keys(categoriesLabels).filter(categoryKey => filterVideosByCategory(categoryKey).length === 0);


    return {
        labels,
        styles,
        userVideos,
        filterVideosByCategory,
        categoriesWithoutVideos,
        categoriesWithVideos,
        navigateToCategory,
        categoriesLabels,
        navigateToVideo
    };
};
