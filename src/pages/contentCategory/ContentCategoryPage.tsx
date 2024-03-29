import { useContentCategoryPageLogic } from "./useContentCategoryPageLogic";

export function ContentCategoryPage() {
    const { styles, labels, filterVideosByCategory,categoriesWithoutVideos,categoriesWithVideos,categoriesLabels,navigateToVideo,navigateToCategory } = useContentCategoryPageLogic();

 
    return (
        <div className="w-full p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white animate-enterFromLeft min-h-96 pb-10 rounded-3xl w-full '>
                <h1 className="text-3xl mt-5 font-bold text-center mb-8" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{labels.categories}</h1>

                {categoriesWithVideos.map(categoryKey => (
                    <div key={categoryKey} className="max-w-5xl mx-auto mt-8">
                        <div className='flex justify-center'>
                            <h2 className="text-2xl text-center px-5 border-b-2 font-bold mb-4" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{categoriesLabels[categoryKey]}</h2>
                        </div>
                        <div className="grid grid-cols-1 " style={{ fontFamily: styles.fonts.text }}>
                            {filterVideosByCategory(categoryKey).map((video: any) => (
                                <div key={video.id}
                                onClick={()=>navigateToVideo(video.id)} className="cursor-pointer rounded-lg p-6 flex">
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
                            {filterVideosByCategory(categoryKey).length > 2 && <div className="flex justify-center mb-4">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4" onClick={() => navigateToCategory(categoryKey)}>
                                    {labels.showMore}
                                </button>
                            </div>}
                        </div>
                    </div>
                ))}

                {categoriesWithoutVideos.map(categoryKey => (
                    <div key={categoryKey} className="max-w-5xl mx-auto mt-8">
                        <div className='flex justify-center'>
                            <h2 className="text-2xl text-center px-5 border-b-2 font-bold mb-4" style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{categoriesLabels[categoryKey]}</h2>
                        </div>
                        <div className="grid grid-cols-1 " style={{ fontFamily: styles.fonts.text }}>
                            <p className="text-center text-gray-500">{labels.noVideosFoundForCategory}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
