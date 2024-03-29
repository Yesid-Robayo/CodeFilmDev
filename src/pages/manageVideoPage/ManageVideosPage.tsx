import { AddVideoComponent } from '../../components/addVideo/AddVideo';
import { EditVideoComponent } from "../../components/editVideo/EditVideoComponent";
import { DeleteVideoComponent } from "../../components/deleteVideo/DeleteVideoComponent";
import { UseManageVideosPageLogic } from './useManageVideosPageLogic';



export const ManageVideosPage = () => {
    const {
        styles,
        labels,
        renderButtons,
        activeTab,

    } = UseManageVideosPageLogic();




    return (
        <div className='w-full py-10 h-full flex-row ' style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='animate-enterFromLeft justify-center items-center'>
            <div className="w-full  flex justify-center items-center">
                {renderButtons()}
            </div>
            <div className='w-full items-center justify-center flex'>
                {activeTab === 'add' && <AddVideoComponent />}

                {activeTab === 'edit' && <EditVideoComponent />}
                {activeTab === 'delete' && <DeleteVideoComponent />}
            </div>
            </div>
          

        </div>
    );
};
