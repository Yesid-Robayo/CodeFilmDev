const ConfirmationModal = ({ showConfirmation, labels, handleDeleteConfirm, handleDeleteCancel, styles }: { showConfirmation: any, labels: any, handleDeleteConfirm: () => void, handleDeleteCancel: () => void, styles: any }) => {
  return (
    showConfirmation && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start pt-28 bg-gray-800 bg-opacity-50">
        <div className="bg-white  p-10 rounded-3xl" style={{ fontFamily: styles.fonts.text }}>
          <p>{labels.sureDeleteVideo}</p>
          <div className="flex justify-between mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full mr-2" onClick={handleDeleteConfirm}>{labels.delete}</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-full ml-2" onClick={handleDeleteCancel}>{labels.cancel}</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
