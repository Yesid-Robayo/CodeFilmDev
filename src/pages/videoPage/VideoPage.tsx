import { useParams } from 'react-router-dom';
import { useVideoPageLogic } from './useVideoPageLogic';

export function VideoPage() {
    const { videoId }: any = useParams();
    const { videoDetails, relatedVideos, styles, labels } = useVideoPageLogic(videoId);

    return (
        <div className="w-full min-h-screen p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white min-h-96 animate-enterFromLeft pb-10 rounded-3xl w-full '>
                <div className="mx-auto ">
                    {videoDetails ? <div className="bg-red-200  grid grid-cols-1 lg:grid-cols-4 p-10 " style={{ fontFamily: styles.fonts.text }}>
                        <div className="lg:col-span-3 mr-5">

                            <div className='w-full justify-center items-center flex'>
                                <video controls className="rounded-lg" style={{ maxWidth: '100%' }}>
                                    <source src={videoDetails.videoURL} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold">{videoDetails.title}</h2>
                                    <p className="text-gray-600 mb-2">{videoDetails.description}</p>
                                </div>
                            </div>

                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Videos relacionados</h2>
                            <div className="grid grid-cols-1 ">
                                {relatedVideos.slice(0,4).map((video: any) => (
                                    <div key={video.id} className="cursor-pointer video-container rounded-lg p-3 flex">
                                        <img src={video.data.thumbnailURL} alt="Thumbnail" className="rounded-lg w-full" />
                                        <div className='flex-row mx-3 pt-2'>
                                            <h3 className="text-md font-semibold">{video.data.title}</h3>
                                            <p className="text-gray-600 mb-1">{video.data.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> : <div className="flex justify-center items-center h-96">
                      <h2 className='text-xl' style={{fontFamily:styles.fonts.text}}>{labels.noVideoFoundOnly}</h2>
                    </div>}
                </div>
            </div>
        </div>
            );
}
