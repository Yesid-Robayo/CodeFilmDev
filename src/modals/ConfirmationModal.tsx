const ConfirmationModal = ({ message, showConfirmation, labels, handleDeleteConfirm, handleDeleteCancel, styles }: { message: any, showConfirmation: any, labels: any, handleDeleteConfirm: () => void, handleDeleteCancel: () => void, styles: any }) => {
  return (
    showConfirmation && (
      <div className="fixed -top-10 left-0 w-full  flex justify-center items-start pt-28 bg-gray-800 bg-opacity-50" style={{height:'200vh'}}>
        <div className="bg-white  p-10 rounded-3xl" style={{ fontFamily: styles.fonts.text }}>
          <p>{message}</p>
          <div className="flex justify-between mt-4">
            <button className=" text-white px-4 py-2 rounded-full mr-2" style={{backgroundColor:styles.colors['blue-500']}} onClick={handleDeleteConfirm}>{labels.accept}</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-full ml-2" onClick={handleDeleteCancel}>{labels.cancel}</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
