import { useEffect, useState } from "react";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";
import { get } from "http";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useSelector } from "react-redux";

export const useHomePageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const { startLoading, stopLoading } = useLoadingContext();
    const userData = useSelector((state: any) => state.auth.user);
    const getVideos = async () => {
        startLoading();
        await FirestoreMethods.searchStorageFile("videos", "autor", userData.username).then((response) => {
            if (response.success) {
                setUserVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
        stopLoading();
    }
    useEffect(() => {
        getVideos();
    }, []);
    return {
        labels,
        styles,
        userVideos
    }
}