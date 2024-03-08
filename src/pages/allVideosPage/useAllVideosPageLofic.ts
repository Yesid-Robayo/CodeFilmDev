import { useEffect, useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useSelector } from "react-redux";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";
import { useNavigate } from "react-router-dom";

export const useAllVideosPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    
    const [allVideos, setAllVideos] = useState<any[]>([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const changeSearchTerm = (e: any) => {
        setSearchTerm(e);
    }
    const filteredVideos = allVideos.filter(video => {
        return video.data.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getVideos = async () => {
        await FirestoreMethods.getAllStorage("videos").then((response) => {
            if (response.success) {
                setAllVideos(response.data);
            } else {
                console.error("Error buscando videos:", response.error);
            }
        });
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
        allVideos,
        filteredVideos,
        searchTerm,
        changeSearchTerm,
        navigateToVideo
    }
}