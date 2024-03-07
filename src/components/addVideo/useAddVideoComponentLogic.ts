import { ChangeEvent, useState } from "react";
import { VideoDetails } from "../../utils/utilsDTOS";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { blobToBase64 } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { storage } from "../../config/fireBaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { useLabels, useLoadingContext, useStyles, useToast } from "../../hooks/contextHooks";

export const useAddVideoLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const navigate = useNavigate();
    const toast = useToast();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { startLoading, stopLoading } = useLoadingContext();
    const userData= useSelector ((state:any)=> state.auth.user);
    const [videoDetails, setVideoDetails] = useState<VideoDetails>({
        name: '',
        review: '',
        category: '',
        thumbnail: null,
        videoFile: null,
    });

    // Manejar cambios en los campos de entrada
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setVideoDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Generar miniatura del video
    const handleThumbnailChange = (videoFile: File | null): void => {
        if (videoFile) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(videoFile);

            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');

                if (context) {
                    video.currentTime = 0;
                    video.onseeked = () => {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob(blob => {
                            if (blob) {
                                setVideoDetails((prevState: any) => ({
                                    ...prevState,
                                    thumbnail: blob
                                }));
                            }
                        }, 'image/png');
                    };
                } else {
                    setErrorMessage(labels.notGetCanvas)
                }
            };
        } else {
            setErrorMessage(labels.notGetCanvas)
        }
    };

    // Manejar cambios en la selección de video
    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoDetails(prevState => ({
                ...prevState,
                videoFile: file
            }));
            handleThumbnailChange(file);
        }
    };

    // Agregar video a Firestore
    const handleAddVideo = async () => {
        startLoading();
        if (!videoDetails.name || !videoDetails.category || !videoDetails.thumbnail || !videoDetails.videoFile) {
            setErrorMessage('Todos los campos son obligatorios.');
            stopLoading();

            return;
        }

        try {
            // Verificar si ya existe un video con el mismo nombre
            const existingVideos = await FirestoreMethods.searchStorageFile("videos", "name", videoDetails.name);
            if (existingVideos.success && existingVideos.data.length > 0) {
                setErrorMessage(labels.alReadyVideoName);
                stopLoading();

                return;
            }

            // Referencias de Firebase Storage
            const thumbnailRef = ref(storage, `thumbnails/${videoDetails.name}`);
            const videoRef = ref(storage, `videos/${videoDetails.name}`);

            // Subida de archivos
            const thumbnailSnapshot = await uploadBytes(thumbnailRef, videoDetails.thumbnail);
            const videoSnapshot = await uploadBytes(videoRef, videoDetails.videoFile);

            // Obtener URLs de descarga
            const thumbnailURL = await getDownloadURL(thumbnailSnapshot.ref);
            const videoURL = await getDownloadURL(videoSnapshot.ref);

            // Agregar datos a Firestore
            await FirestoreMethods.addStorageFile("videos", {
                name: videoDetails.name,
                review: videoDetails.review,
                category: videoDetails.category,
                thumbnailURL: thumbnailURL,
                videoURL: videoURL,
                autor: userData.username,
                createdAt: new Date()
            });

            // Reinicio de los detalles del video
            setVideoDetails({
                name: '',
                review: '',
                category: '',
                thumbnail: null,
                videoFile: null,
            });
            

            setErrorMessage('');
            toast.showToast(labels.creationVideoCorrect);
        } catch (error) {
            setErrorMessage(labels.addVideoError);
            console.error('Error adding video:', error);
        }
        stopLoading();
    };

    return {
        videoDetails,
        labels,
        styles,
        errorMessage,
        handleInputChange,
        handleVideoChange,
        handleAddVideo
    };
};
