import { useState } from 'react';
import { useDeleteVideoComponentLogic } from "./useDeleteVideoComponentLogic";
import ConfirmationModal from '../../modals/ConfirmationModal';

export const DeleteVideoComponent = () => {
    const { labels, styles, userVideos, handleDeleteConfirm, handleDeleteCancel, handleDeleteConfirmation, showConfirmation } = useDeleteVideoComponentLogic();


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

           
                <ConfirmationModal
                    showConfirmation={showConfirmation}
                    labels={labels}
                    handleDeleteConfirm={handleDeleteConfirm}
                    handleDeleteCancel={handleDeleteCancel}
                    styles={styles}
                />
          
        </div>
    )
}
