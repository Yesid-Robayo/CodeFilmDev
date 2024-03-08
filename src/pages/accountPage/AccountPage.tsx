import ConfirmationModal from '../../modals/ConfirmationModal';
import { useAccountPageLogic } from './useAccountPageLogic';

export const AccountPage = () => {
    const { styles, labels, userData, confirmNewPassword, errorMessage, currentPassword, setPassword, setNewPasswordMethod, newPassword, handleDeleteCancelAccount, handleDeleteConfirmAccount, isDeleteAccount, handlePasswordChange, handleCancelConfirmPassword, isConfirmChangePassword, setConfirmNewPasswordMethod } = useAccountPageLogic();

    return (
        <div className="w-full min-h-screen p-10 flex flex-col items-center justify-center" style={{ backgroundColor: styles.colors['blue-100'] }}>
            <div className='bg-white min-h-96 animate-enterFromLeft pb-10 rounded-3xl w-full '>
                {userData && <div>
                    <h1 className="text-2xl mt-5 text-center " style={{ fontFamily: styles.fonts.primary, color: styles.colors['blue-500'] }}>{labels.myAccount}</h1>
                    <div className="max-w-md mx-auto mt-8" style={{ fontFamily: styles.fonts.text }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.user}</label>
                            <p>{userData.username}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.name}</label>
                            <p>{userData.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.dateOfBirth}</label>
                            <p>{userData.dateOfBirth}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.email}</label>
                            <p>{userData.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.currentPass}</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-2 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.newpass}</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPasswordMethod(e.target.value)}
                                className="w-full py-2 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">{labels.confirmNewPassword}</label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPasswordMethod(e.target.value)}
                                className="w-full py-2 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                        <div className="flex justify-center">
                            <button onClick={() => handleCancelConfirmPassword()} style={{ backgroundColor: styles.colors['blue-500'] }} className=" text-white py-2 px-4 rounded-lg mr-4">{labels.changePassword}</button>
                            <button onClick={() => handleDeleteCancelAccount()} className="bg-red-500 text-white py-2 px-4 rounded-lg">{labels.deleteAccount}</button>
                        </div>

                        <ConfirmationModal message={labels.sureDeleteAccount} showConfirmation={isDeleteAccount} labels={labels} handleDeleteConfirm={() => handleDeleteConfirmAccount()} handleDeleteCancel={() => handleDeleteCancelAccount()} styles={styles} />
                        <ConfirmationModal message={labels.sureChangePass} showConfirmation={isConfirmChangePassword} labels={labels} handleDeleteConfirm={() => handlePasswordChange()} handleDeleteCancel={() => handleCancelConfirmPassword()} styles={styles} />
                    </div>
                </div>}

            </div>
        </div>
    );
}
