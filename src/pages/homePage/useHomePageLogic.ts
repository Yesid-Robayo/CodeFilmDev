import { useEffect, useState } from "react";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";
import { get } from "http";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/utilsTypes";

export const useHomePageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const [allVideos, setAllVideos] = useState<any[]>([]);
    const { startLoading, stopLoading } = useLoadingContext();
    const userData = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();

    const getVideos = async () => {
        startLoading();
        if (userData) {
            await FirestoreMethods.searchStorageFile("videos", "autor", userData.username).then((response) => {
                if (response.success) {
                    setUserVideos(response.data);
                } else {
                    console.error("Error buscando videos:", response.error);

                }
            });
        }

        await FirestoreMethods.getAllStorage('videos').then((response) => {
            if (response.success) {
                setAllVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
        stopLoading();
    }



    const navigateAll = (path: routes) => {
        navigate(path);
    }

    const navigateAllChildren = (path: routes, children: string) => {
        navigate(`${path}/${children}`);
    }


    useEffect(() => {
        getVideos();
    }, []);
    return {
        labels,
        navigateAllChildren,
        navigateAll,
        allVideos,
        styles,
        userVideos
    }
}