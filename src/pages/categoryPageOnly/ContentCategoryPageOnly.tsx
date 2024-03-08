import {  useParams } from 'react-router-dom';
import { useContentCategoryPageOnlyLogic } from './useContentCategoryPageOnlyLogic';

export function ContentCategoryPageOnly() {
    const { categoryKey }: any = useParams();
    const { styles, labels, filterVideosByCategory, navigateToVideo,selectedCategoryLabel } = useContentCategoryPageOnlyLogic(categoryKey);

    return (
        <div className="w-full min-h-screen p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white animate-enterFromLeft min-h-96 pb-10 rounded-3xl w-full '>
                <h1 className="text-2xl mt-5  text-center " style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{selectedCategoryLabel}</h1>

                <div className="max-w-5xl mx-auto ">
                    <div className="grid grid-cols-1 " style={{ fontFamily: styles.fonts.text }}>
                        {filterVideosByCategory(categoryKey).map((video: any) => (
                            <div key={video.id}
                                onClick={() => navigateToVideo(video.id)} className="cursor-pointer video-container rounded-lg p-6 flex">
                                <img src={video.data.thumbnailURL} alt="Thumbnail" className="rounded-3xl mt-2 w-60" />
                                <div className='flex-row mx-10 pt-5'>
                                    <h3 className="text-lg font-semibold">{video.data.name}</h3>
                                    <p className="text-gray-600 mb-2">{video.data.review}</p>
                                    <div className='flex text-sm'>
                                        <h3 className='flex mb-auto'>Author:</h3>
                                        <h3 className='flex ml-4'>{video.data.autor}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filterVideosByCategory(categoryKey).length === 0 && (
                            <p className="text-center text-gray-500">{labels.noVideosFoundForCategory}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
