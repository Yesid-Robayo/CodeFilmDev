import { useEffect, useState } from "react";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";
import { useNavigate } from "react-router-dom";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useSelector } from "react-redux";

export const useMyVideosPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();

    const [userVideos, setUserVideos] = useState<any[]>([]);
    const { startLoading, stopLoading } = useLoadingContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const userData = useSelector((state: any) => state.auth.user);
    const changeSearchTerm = (e: any) => {
        setSearchTerm(e);
    }
    const filteredVideos = userVideos.filter(video => {
        return video.data.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
    };

    useEffect(() => {
        getVideos();
    }, []);

    const navigateToVideo = (videoId: string) => {
        navigate(`/video/${videoId}`);
    }

    return {
        styles,
        labels,
        userVideos,
        filteredVideos,
        searchTerm,
        changeSearchTerm,
        navigateToVideo
    }
}