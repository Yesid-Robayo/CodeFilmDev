import IonIcon from "@reacticons/ionicons";
import { useSignUpComponentLogic } from "./useSignUpComponentLogic";

export const SignUpComponent = ({ isSignIn }: { isSignIn: any }) => {
    const {
        styles,
        labels,
        username,
        updateUser,
        email,
        updateEmail,
        name,
        updateName,
        dateOfBirth,
        updateDateOfBirth,
        password,
        updatePassword,
        confirmPassword,
        updateConfirmPassword,
        showPassword,
        changeShowPassword,
        showConfirmPassword,
        changeShowConfirmPassword,
        errorMessage,
        handleSignUp,
    } = useSignUpComponentLogic({ isSignIn });


    return (
        <div className="w-1/2 animate-enterFromLeft my-24 pb-10 h-full first-letter:pb-5 border-2 justify-center items-center rounded-3xl bg-white lg:grid lg:grid-cols-2">
            <div className="col-span-2">
                <h3 className="text-xl font-semibold border-b-2 pb-3 text-center mt-5" style={{ fontFamily: styles.fonts.primary, color: styles.colors["blue-500"] }}>{labels.singUpHere}</h3>
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-2 sm:mt-4" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.user}</h4>
                <input
                    type="text"
                    placeholder={labels.user}
                    className="border-2 w-48 rounded-lg p-2"
                    value={username}
                    onChange={(e) => updateUser(e.target.value)}
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-2 sm:mt-4" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.email}</h4>
                <input
                    type="email"
                    placeholder={labels.email}
                    className="border-2 w-48 rounded-lg p-2"
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.name}</h4>
                <input
                    type="text"
                    placeholder={labels.name}
                    className="border-2 w-48 rounded-lg p-2"
                    value={name}
                    onChange={(e) => updateName(e.target.value)}
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.dateOfBirth}</h4>
                <input
                    type="date"
                    className="border-2 w-48 rounded-lg p-2"
                    value={dateOfBirth}
                    onChange={(e) => updateDateOfBirth(e.target.value)}
                />
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.newpass}</h4>
                <div className="relative w-48 mx-auto">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder={labels.pass}
                        value={password}
                        onChange={(e) => updatePassword(e.target.value)}
                        className="border-2 w-48 rounded-lg p-2 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-1 flex items-center px-3 bg-transparent"
                        onClick={() => changeShowPassword()}
                    >
                        <IonIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
                    </button>
                </div>
            </div>
            <div className="flex-row text-center justify-center items-center w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.confirmPass}</h4>
                <div className="relative w-48 mx-auto">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={labels.pass}
                        value={confirmPassword}
                        onChange={(e) => updateConfirmPassword(e.target.value)}
                        className="border-2 w-48 rounded-lg p-2 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-1 flex items-center px-3 bg-transparent"
                        onClick={() => changeShowConfirmPassword()}
                    >
                        <IonIcon name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} />
                    </button>
                </div>
            </div>
            <p className="text-red-500 animate-enterFromBack h-5 text-sm text-center mt-2 col-span-2">{errorMessage}</p>
            <div className="sm:flex sm:mt-5 flex-row text-center justify-center items-center w-full mt-2 col-span-2" style={{ fontFamily: styles.fonts.text }}>
                <button className="block sm:inline-block mx-auto sm:mx-0 text-white p-3 rounded-full" style={{ backgroundColor: styles.colors["blue-500"] }} onClick={handleSignUp}>
                    {labels.singUpHere}
                </button>
                <h4 onClick={isSignIn} className="sm:ml-5 mt-3 text-sm cursor-pointer inline-block border-b-2 px-2 pb-1">{labels.logIn}</h4>
            </div>
        </div>
    );
}
