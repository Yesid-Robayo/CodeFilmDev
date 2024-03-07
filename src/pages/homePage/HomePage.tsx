import React, { useState } from 'react';
import { useHomePageLogic } from './useHomePageLogic';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const { labels, styles, userVideos } = useHomePageLogic();
    const navigate = useNavigate();

    const [showAllVideos, setShowAllVideos] = useState(false);
    const [showMoreMyVideos, setShowMoreMyVideos] = useState(false);

    const filteredVideos = showAllVideos ? userVideos : userVideos.slice(0, 3); // Mostrar solo los primeros 3 videos
    const filteredUserVideos = showMoreMyVideos ? userVideos : userVideos.slice(0, 3); // Mostrar solo los primeros 3 videos

    const navigateToCategory = (categoryId: string) => {
        navigate(`/category/${categoryId}`);
    };

    const navigateToVideo = (videoId: string) => {
        navigate(`/video/${videoId}`);
    }

    return (
        <div className="w-full p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white rounded-3xl w-full h-full'>
                <div className="max-w-5xl mx-auto mb-8">
                    <div className='flex justify-center'>
                        <h2 className=" border-b-2 text-center px-5 mt-10 text-2xl font-bold mb-4" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{labels.videoCategories}</h2>
                    </div>
                    <div className='flex w-full justify-center'>
                        <ul className="flex flex-wrap gap-4" style={{ fontFamily: styles.fonts.text }}>
                            <li className="rounded-lg p-2 cursor-pointer text-white" style={{ backgroundColor: styles.colors['blue-400'] }} onClick={() => navigateToCategory('action')}>{labels.categoryAction}</li>
                            <li className="rounded-lg p-2 cursor-pointer text-white" style={{ backgroundColor: styles.colors['blue-400'] }} onClick={() => navigateToCategory('comedy')}>{labels.categoryComedy}</li>
                            <li className="rounded-lg p-2 cursor-pointer text-white" style={{ backgroundColor: styles.colors['blue-400'] }} onClick={() => navigateToCategory('horror')}>{labels.categoryHorror}</li>
                            <li className="rounded-lg p-2 cursor-pointer text-white" style={{ backgroundColor: styles.colors['blue-400'] }} onClick={() => navigateToCategory('drama')}>{labels.categoryDrama}</li>
                            <li
                                className="rounded-lg py-2 cursor-pointer border-b-2 text-black">{labels.showMore}</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto mt-8">
                    <div className='flex justify-center'>
                        <h2 className="text-2xl text-center px-5 border-b-2 font-bold mb-4" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{labels.allVideos}</h2>
                    </div>

                    <div className="grid grid-cols-1 " style={{ fontFamily: styles.fonts.text }}>
                        {filteredVideos.map((data) => (
                            <div key={data.id} 
                            onClick={() => navigateToVideo(data.id)}
                            className="cursor-pointer rounded-lg p-6 flex ">
                                <img src={(data.data.thumbnailURL)} alt="Thumbnail" className="rounded-3xl mt-2  w-60" />
                                <div className='flex-row mx-10 pt-5'> <h3 className="text-lg font-semibold">{data.data.name}</h3>
                                    <p className="text-gray-600 mb-2">{data.data.review}</p>
                                    <div className='flex text-sm'>
                                        <h3 className='flex mb-auto'>{labels.autor}</h3>                                         <h3 className='flex ml-4'>{data.data.autor}</h3></div>
                                </div>
                            </div>
                        ))}

                        {!showAllVideos && (
                            <div className="flex justify-center mb-10 w-full">
                                <button className="bg-blue-500 text-white w-40 py-2 px-4 rounded-lg mt-4" onClick={() => setShowAllVideos(true)}>
                                    {labels.showMore}
                                </button>
                            </div>

                        )}
                    </div>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className='flex justify-center'>
                        <h2 className="text-2xl text-center px-5 border-b-2 font-bold mb-4" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{labels.myVideos}</h2>
                    </div>

                    <div className="grid grid-cols-1  gap-4" style={{ fontFamily: styles.fonts.text }}>
                        {filteredUserVideos.map((data) => (
                            <div key={data.id} 
                            onClick={() => navigateToVideo(data.id)}
                            className="rounded-lg cursor-pointer p-6 flex ">
                                <img src={(data.data.thumbnailURL)} alt="Thumbnail" className="rounded-3xl mt-2  w-60" />
                                <div className='flex-row h-full bgre mx-10 pt-5'> <h3 className="text-lg font-semibold">{data.data.name}</h3>
                                    <p className="text-gray-600 mb-2">{data.data.review}</p>
                                    <div className='flex text-sm'>
                                        <h3 className='flex mb-auto'>{labels.autor}</h3>                                         <h3 className='flex ml-4'>{data.data.autor}</h3></div>

                                </div>
                            </div>
                        ))}

                        {userVideos.length > 3 && (
                            <div className="flex justify-center mb-10 w-full">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4" onClick={() => setShowMoreMyVideos(true)}>
                                    {labels.showMore}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
