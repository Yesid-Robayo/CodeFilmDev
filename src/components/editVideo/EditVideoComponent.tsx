import ReactPlayer from "react-player";
import { useEditVideoComponentLogic } from "./useEditVideoComponentLogic";

export const EditVideoComponent = () => {
    const { labels, userVideos, styles, changeSetVideoReview, changeVideoReview, selectedVideo, selectVideo, videoReview } = useEditVideoComponentLogic();
    return (
        <div className="w-1/2 at pb-10 h-full min-h-screen first-letter:pb-5 border-2 justify-center items-center rounded-3xl bg-white  ">
            <div className="flex w-full justify-center">
                <h3 className="text-xl font-semibold border-b-2 pb-3 text-center mt-5" style={{ fontFamily: styles.fonts.primary, color: styles.colors["blue-500"] }}>{labels.myVideos}</h3>
            </div>
            {!selectVideo ? <div className="lg:grid lg:grid-cols-2">
                {userVideos.map((data) => {
                    return (
                        <div key={data.id} className="flex my-10 flex-col items-center justify-center">
                            <h1 className="mb-4 w-10/12 text-center h-10" style={{ fontFamily: styles.fonts.text }}>{data.data.name}</h1>
                           
                            <ReactPlayer
                               url={data.data.videoURL}
                               controls
                               className="react-player rounded-lg"
                               width="20rem"
                               height="10rem"
                           />
                            <button className=" rounded-3xl mt-5  text-white w-1/2 h-10" onClick={() => selectedVideo(data.data, data.id)} style={{ fontFamily: styles.fonts.text, backgroundColor: styles.colors["blue-500"] }}>{labels.edit}</button>
                        </div>
                    )
                })}

            </div> : <div className="flex-row justify-center items-center h-full">

                <div className="flex-row text-center justify-center items-center w-full mt-2 sm:mt-4" style={{ fontFamily: styles.fonts.text }}>
                    <h4 className="mb-2">{labels.videoName}</h4>
                    <h4 className="mb-2">{selectVideo.video.name}</h4>
                </div>
                <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                    <h4 className="mb-2">{labels.videoReview}</h4>
                    <textarea
                        placeholder={selectVideo.video.review}
                        value={videoReview}
                        className="border-2 w-64 rounded-lg p-2"
                        onChange={(event) => changeSetVideoReview(event.target.value)}
                        name="review"
                    />

                </div>
                <div className="w-full p-5 mt-5 justify-center items-center">
                    <ReactPlayer
                                url={selectVideo.video.videoURL}
                                controls
                                className="react-player rounded-lg"
                                width="100%"
                                height="100%"
                            />
                </div>

                <div className="sm:flex sm:mt-5 flex-row text-center justify-center items-center w-full mt-2" style={{ fontFamily: styles.fonts.text }}>
                    <button className="block sm:inline-block mx-auto sm:mx-0 text-white p-3 rounded-full mr-2" style={{ backgroundColor: styles.colors["blue-500"] }} onClick={() => changeVideoReview()}>
                        {labels.editReview}
                    </button>
                </div>
            </div>

            }
            {userVideos.length === 0 && <h2 className="text-xl text-center mt-10 w-full" style={{ fontFamily: styles.fonts.text }}>{labels.noVideosFound}</h2>}


        </div>
    )
}