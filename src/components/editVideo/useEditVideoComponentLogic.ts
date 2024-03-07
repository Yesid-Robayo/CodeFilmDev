import { useSelector } from "react-redux";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLabels, useLoadingContext, useStyles } from "../../hooks/contextHooks";

export const useEditVideoComponentLogic = () => {
    const styles = useStyles();

    const labels = useLabels();
    const { startLoading, stopLoading } = useLoadingContext();
    const userData = useSelector((state: any) => state.auth.user);
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const [selectVideo, setSelectVideo] = useState<any>(null);
    const [videoReview, setvideoReview] = useState<string>(selectVideo ? selectVideo.video.review : "");
    const navigate = useNavigate();
    const changeSetVideoReview = (value: string) => {
        setvideoReview(value);
    }
    const changeVideoReview = async () => {
        console.log("videoReview", videoReview);
        if (videoReview === "") return;
        startLoading();
        await FirestoreMethods.updateStorageFile("videos", selectVideo.id, { review: videoReview }).then((response) => {
            if (response.success) {
                getVideos();
                setSelectVideo(null);
                setvideoReview("");
                navigate("/videos")
            } else {
                console.error("Error actualizando video:", response.error);
            }
        });
        stopLoading();
    }
    const selectedVideo = (video: any, id: string) => {
        setSelectVideo({ video, id });
    }

    useEffect(() => {
        getVideos();
    }, []);
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
    return {
        labels,
        userVideos,
        styles,
        selectedVideo,
        selectVideo,
        changeSetVideoReview,
        changeVideoReview,
        videoReview
    }
}