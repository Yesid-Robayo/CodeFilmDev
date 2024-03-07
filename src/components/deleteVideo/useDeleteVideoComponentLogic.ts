import { useContext, useEffect, useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useSelector } from "react-redux";
import { useLabels, useLoadingContext, useStyles, useToast } from "../../hooks/contextHooks";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../config/fireBaseConfig";

export const useDeleteVideoComponentLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const [userVideos, setUserVideos] = useState<any[]>([]);
    const { startLoading, stopLoading } = useLoadingContext();
    const userData = useSelector((state: any) => state.auth.user);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
const toast = useToast();
    const handleDeleteConfirmation = (data: any) => {
        setShowConfirmation(true);
        window.scrollTo(0, 0);
        setVideoToDelete(data);
    };

    const handleDeleteCancel = () => {
        setShowConfirmation(false);
        setVideoToDelete(null);
    };

    const handleDeleteConfirm = () => {
        deleteVideo(videoToDelete);
        setShowConfirmation(false);
        setVideoToDelete(null);
    };
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

    const deleteVideo = async (video: any) => {

        startLoading();
    try {
        // Eliminar video de Firebase Storage
        const thumbnailRef = ref(storage, `thumbnails/${video.data.name}`);
        const videoRef = ref(storage, `videos/${video.data.name}`);

        await deleteObject(thumbnailRef);
        await deleteObject(videoRef);

        // Eliminar video de Firestore
        await FirestoreMethods.deleteStorageFile("videos", video.id);

        toast.showToast(labels.deleteVideoCorrect);
        getVideos();
    } catch (error) {
        console.error('Error deleting video:', error);
        toast.showToast(labels.deleteVideoError);
    }

    stopLoading();
    }

    useEffect(() => {
        getVideos();
    }, []);
    return {
        styles,
        labels,
        deleteVideo,
        userVideos,
        showConfirmation,
        handleDeleteCancel,
        handleDeleteConfirmation,
        handleDeleteConfirm
    };
};