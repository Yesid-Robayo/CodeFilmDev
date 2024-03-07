import React from 'react';
import { useParams } from 'react-router-dom';
import { useVideoPageLogic } from './useVideoPageLogic';

// Definir el tipo de los parámetros de la URL
interface Params {
    videoId?: string; // Hacer la propiedad opcional
}

export function VideoPage() {
    const { videoId }: any = useParams(); // Obtener el parámetro de la URL que contiene el ID del video
    const { videoDetails } = useVideoPageLogic(videoId);

    if (!videoDetails) {
        // Manejar el caso donde no se encuentra el video
        return (
            <div className="container mx-auto px-4 mt-8">
                <h1 className="text-2xl font-bold mb-2">Video not found</h1>
                <p className="text-gray-600">Sorry, the requested video could not be found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-3/4">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoDetails.videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold mb-2">{videoDetails.title}</h1>
                        <p className="text-gray-600">{videoDetails.description}</p>
                    </div>
                </div>
                <div className="lg:w-1/4 lg:ml-8">
                    <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
                    {/* Aquí puedes mostrar una lista de videos relacionados */}
                </div>
            </div>
        </div>
    );
}
