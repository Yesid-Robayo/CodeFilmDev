import { useDispatch, useSelector } from "react-redux";
import { useLabels, useLoadingContext, useStyles, useToast } from "../../hooks/contextHooks";
import { userData } from "../../utils/utilsDTOS";
import { useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { authReducer } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

export const useAccountPageLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    const userData: userData = useSelector((state: any) => state.auth.user);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false);
    const [isConfirmChangePassword, setIsConfirmChangePassword] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { startLoading, stopLoading } = useLoadingContext();
    const handlePasswordChange = async () => {
        startLoading();
        setConfirmNewPassword('');
        setNewPassword('');
        setCurrentPassword('');
        setErrorMessage('');
        setIsConfirmChangePassword(!isConfirmChangePassword);

        try {
            const res = await FirestoreMethods.searchStorageFile('users', 'username', userData.username);
            const userId = res.data[0].id;

            await FirestoreMethods.updateStorageFile('users', userId, { password: newPassword });

            toast.showToast(labels.changeCorrect);
            navigate('/login');
            setIsConfirmChangePassword(!isConfirmChangePassword);
            dispatch(authReducer.actions.logOut());
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('An error occurred while changing password.');
        } finally {
            stopLoading();
        }
    };

    const setPassword = (e: any) => {
        setCurrentPassword(e);
    }
    const setNewPasswordMethod = (e: any) => {
        setNewPassword(e);
    }
    const setConfirmNewPasswordMethod = (e: any) => {
        setConfirmNewPassword(e);
    }
    const handleDeleteCancelAccount = () => {
        setIsDeleteAccount(!isDeleteAccount);

    };
    const handleCancelConfirmPassword = async () => {
        if (newPassword !== confirmNewPassword || newPassword == '' || currentPassword !== userData.password) {
            setErrorMessage(labels.newPassDontMatch);

            return;
        } else {
            setErrorMessage('');
            setIsConfirmChangePassword(!isConfirmChangePassword);

        }
    }

    const handleDeleteConfirmAccount = async () => {
        startLoading();
        try {
            const res = await FirestoreMethods.searchStorageFile('users', 'username', userData.username);
            const userId = res.data[0].id;

            await FirestoreMethods.deleteStorageFile('users', userId);

            toast.showToast(labels.correctDeleteAccount);
            navigate('/login');
            setIsDeleteAccount(false)
            dispatch(authReducer.actions.logOut());
        } catch (error) {
            console.error('Error changing password:', error);
        } finally {
            stopLoading();
        };
    }

    return {
        styles,
        labels,
        userData,
        handleCancelConfirmPassword,
        setConfirmNewPasswordMethod,
        confirmNewPassword,
        setNewPasswordMethod,
        newPassword,
        currentPassword,
        setPassword,
        isConfirmChangePassword,
        isDeleteAccount,
        errorMessage,
        handlePasswordChange,
        handleDeleteCancelAccount,
        handleDeleteConfirmAccount
    };
};