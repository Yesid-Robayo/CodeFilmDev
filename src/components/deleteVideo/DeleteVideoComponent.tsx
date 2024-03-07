import { useState } from 'react';
import { useDeleteVideoComponentLogic } from "./useDeleteVideoComponentLogic";

export const DeleteVideoComponent = () => {
    const { labels, styles, userVideos, handleDeleteConfirm, handleDeleteCancel,handleDeleteConfirmation,showConfirmation} = useDeleteVideoComponentLogic();
   

    return (
        <div className="w-1/2 at pb-10 h-full min-h-screen first-letter:pb-5 border-2 justify-center items-center rounded-3xl bg-white  ">
            <div className="flex w-full justify-center">
                <h3 className="text-xl font-semibold border-b-2 pb-3 text-center mt-5" style={{ fontFamily: styles.fonts.primary, color: styles.colors["blue-500"] }}>{labels.myVideos}</h3>
            </div>
            <div className="lg:grid lg:grid-cols-2">
                {userVideos.map((data) => {
                    return (
                        <div key={data.id} className="flex my-10 flex-col items-center justify-center">
                            <h1 className="mb-4" style={{ fontFamily: styles.fonts.text }}>{data.data.name}</h1>
                            <video controls className="w-1/2 mb-3 h-1/2" src={data.data.videoURL} />
                            <button className="rounded-full bg-red-500 text-white w-1/2 h-10"
                                onClick={() => handleDeleteConfirmation(data)}
                                style={{ fontFamily: styles.fonts.text }}>{labels.deletevideo}</button>
                        </div>
                    )
                })}
            </div>

            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white -mt-36 p-10 rounded-3xl" style={{fontFamily:styles.fonts.text}}>
                        <p>{labels.sureDeleteVideo}</p>
                        <div className="flex justify-between mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-full mr-2" onClick={handleDeleteConfirm}>{labels.delete}</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-full ml-2" onClick={handleDeleteCancel}>{labels.cancel}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
