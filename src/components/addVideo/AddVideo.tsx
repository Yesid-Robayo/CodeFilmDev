import ReactPlayer from "react-player";
import { useAddVideoLogic } from "./useAddVideoComponentLogic";

export const AddVideoComponent = () => {
    const { labels, styles, videoDetails, handleInputChange, handleVideoChange, errorMessage, handleAddVideo, clearFields } = useAddVideoLogic();
    return (
        <div className="w-1/2 pb-10 h-full first-letter:pb-5 border-2 justify-center items-center rounded-3xl bg-white">
            <div className="flex justify-center items-center">
                <div>
                    <h3 className="text-xl font-semibold border-b-2 pb-3 text-center mt-5" style={{ fontFamily: styles.fonts.primary, color: styles.colors["blue-500"] }}>{labels.addVideo}</h3>
                </div>
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-2 sm:mt-4" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.videoName}</h4>
                <input
                    type="text"
                    placeholder={labels.videoName}
                    className="border-2 w-64 rounded-lg p-2"
                    value={videoDetails.name}
                    onChange={handleInputChange}
                    name="name"
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.videoCategory}</h4>
                <select
                    className="border-2 w-64rounded-lg p-2"
                    value={videoDetails.category}
                    onChange={handleInputChange}
                    name="category"
                >
                    <option value="" disabled>{labels.selectCategory}</option>
                    <option value="action">{labels.categoryAction}</option>
                    <option value="comedy">{labels.categoryComedy}</option>
                    <option value="drama">{labels.categoryDrama}</option>
                    <option value="horror">{labels.categoryHorror}</option>
                    <option value="romance">{labels.categoryRomance}</option>
                    <option value="documentary">{labels.categoryDocumentary}</option>
                    <option value="scienceFiction">{labels.categoryScienceFiction}</option>
                </select>
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.videoReview}</h4>
                <textarea
                    placeholder={labels.videoReview}
                    className="border-2 w-64 rounded-lg p-2"
                    value={videoDetails.review}
                    onChange={handleInputChange}
                    name="review"
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.uploadVideo}</h4>
                <input
                    type="file"
                    accept="video/*"
                    className="border-2 w-64 rounded-lg p-2"
                    onChange={(event) => handleVideoChange(event)}
                    name="videoFile"
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.videoPreview}</h4>
                <div className='w-full justify-center p-5 items-center flex'>
                    {!videoDetails.videoFile ? (
                        <div className='h-40 w-40 bg-gray-200 animate-pulse'></div>
                    ) : (

                        <ReactPlayer
                            url={URL.createObjectURL(videoDetails.videoFile)}
                            controls
                            className="react-player rounded-lg"
                            width="100%"
                            height="100%"
                        />
                    )}
                </div>
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.thumbnail}</h4>
                <div className='w-full justify-center items-center flex'>
                    {!videoDetails.thumbnail ? (
                        <div className='h-40 w-80 bg-gray-200 animate-pulse'></div>
                    ) : (
                        <img className='h-40 w-80 ' src={URL.createObjectURL(videoDetails.thumbnail)} alt="Thumbnail" />
                    )}
                </div>
            </div>
            <p className="text-red-500 animate-enterFromBack h-5 text-sm text-center mt-2">{errorMessage}</p>
            <div className="sm:flex sm:mt-5 flex flex-col text-center justify-center items-center w-full mt-2" style={{ fontFamily: styles.fonts.text }}>
                <button className="block sm:inline-block mx-auto sm:mx-0 text-white p-3 rounded-full mr-2" style={{ backgroundColor: styles.colors["blue-500"] }} onClick={handleAddVideo}>
                    {labels.addVideo}
                </button>
                <button className="block sm:inline-block mx-auto mt-4 sm:mx-0 text-white bg-gray-600 p-3 rounded-full mr-2" onClick={clearFields}>
                    {labels.clear}
                </button>
            </div>
        </div>
    );
};
