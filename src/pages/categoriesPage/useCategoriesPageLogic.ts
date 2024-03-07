import { useEffect, useState } from "react";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";
import { useSelector } from "react-redux";
import { FirestoreMethods } from "../../services/fireBaseMethods";

export const useCategoriesPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const { startLoading, stopLoading } = useLoadingContext();
    const userData = useSelector((state: any) => state.auth.user);

    const getVideos = async () => {
        startLoading();
        await FirestoreMethods.getAllStorage("videos").then((response) => {
            if (response.success) {
                setUserVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
        stopLoading();
    };

    useEffect(() => {
        getVideos();
    }, []);

    const filterVideosByCategory = (category: string) => {
        console.log('category', category);
        console.log('userVideos', userVideos.filter(video => video.data.category === category));
        return userVideos.filter(video => video.data.category === category);
    };

    return {
        labels,
        styles,
        userVideos,
        filterVideosByCategory
    };
};
