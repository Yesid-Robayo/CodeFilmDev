import { useParams } from 'react-router-dom';
import { useVideoPageLogic } from './useVideoPageLogic';

export function VideoPage() {
    const { videoId }: any = useParams();
    const { videoDetails, relatedVideos, navigateToVideo,styles, labels } = useVideoPageLogic(videoId);

    return (
        <div className="w-full min-h-screen p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white min-h-96 animate-enterFromLeft pb-2 rounded-3xl w-full '>
                <div className="mx-auto ">
                    {videoDetails ? <div className="  grid grid-cols-1 lg:grid-cols-3 p-10 " style={{ fontFamily: styles.fonts.text }}>
                        <div className="lg:col-span-2 lg:mr-5">

                            <div className='w-full justify-center items-center flex'>
                                <video controls className="rounded-lg" style={{ maxWidth: '100%' }}>
                                    <source src={videoDetails.videoURL} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>


                            </div>
                            <div className=' mt-5' style={{ fontFamily: styles.fonts.primary }}>
                                <h1 className='text-3xl text-black'>{videoDetails.name}</h1>
                                <h4 className='text-sm text-gray-600 font-bold mt-2'>{videoDetails.createdAt
                                }</h4>
                                <h4 className='text-xl my-6 text-gray-700'>{videoDetails.review}</h4>
                                <div className='flex mb-2  items-center'>
                                    <h2 className="text-sm font-semibold">{labels.autor}</h2>
                                    <p className="text-sm ml-2 text-gray-600">{videoDetails.autor}</p>
                                </div>
                                <div className='flex  items-center'>
                                    <h2 className="text-sm font-semibold">{labels.category}</h2>
                                    <p className="text-sm ml-2 text-gray-600">{videoDetails.category}</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg mt-6 lg:mt-0 text-center font-semibold mb-4">{labels.videoRelated}</h2>
                            <div className="grid grid-cols-1 ">
                                {relatedVideos.slice(0, 5).map((video: any) => (
                                    <div key={video.id}
                                        onClick={() => navigateToVideo(video.id)}
                                        className="cursor-pointer rounded-lg p-3 flex">
                                        <img src={video.data.thumbnailURL} alt="Thumbnail" className="rounded-lg w-80 h-40 lg:h-28 lg:w-60" />
                                        <div className='flex w-40 flex-col mx-3 pt-2'>
                                            <h3 className="text-md font-semibold ">{video.data.name}</h3>

                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div> : <div className="flex justify-center items-center h-96">
                        <h2 className='text-xl' style={{ fontFamily: styles.fonts.text }}>{labels.noVideoFoundOnly}</h2>
                    </div>}
                </div>
            </div>
        </div>
    );
}
