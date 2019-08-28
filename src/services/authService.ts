import { fire } from '../index';
import { User } from 'firebase';

const USER_COLLECTION = 'Users';

export interface IAuthError {
    code: string;
    message: string;
}

class AuthService {
    public logIn = (email: string, password: string) => {
        return new Promise<User>(async (resolve, reject) => {
            try {
                fire.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(
                        (userCred: firebase.auth.UserCredential) => {
                            if (userCred.user) {
                                const user: User = userCred.user;
                                resolve(user);
                            } else {
                                const error: IAuthError = {
                                    code: '501',
                                    message: 'User cannot be found',
                                };
                                reject(error);
                            }
                        },
                        (reason: IAuthError) => {
                            reject(reason);
                        }
                    );
            } catch (error) {
                const authError: IAuthError = {
                    code: '501',
                    message: 'There has been an error with sign in',
                };
                reject(authError);
            }
        });
    };

    public logOut = () => {
        return new Promise<void>(async (resolve, reject) => {
            fire.auth()
                .signOut()
                .then(
                    value => {
                        resolve();
                    },
                    reason => {
                        reject(reason);
                    }
                );
        });
    };

    public signUp = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        return new Promise<void>(async (resolve, reject) => {
            fire.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async userCred => {
                    if (userCred.user) {
                        const user: User = userCred.user;
                        await user.updateProfile({
                            displayName: `${firstName} ${lastName}`,
                        });
                        await this._sendVerificationEmail(user);
                        await this._createUserRecord(
                            user,
                            email,
                            firstName,
                            lastName
                        );
                        resolve();
                    }
                })
                .catch(reason => {
                    const error: IAuthError = {
                        code: reason.code,
                        message: reason.message,
                    };
                    reject(error);
                });
        });
    };

    public forgotPassword = (email: string) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                fire.auth()
                    .sendPasswordResetEmail(email)
                    .then(() => {
                        // Password Reset Email Sent!
                        resolve();
                    })
                    .catch(reason => {
                        const error: IAuthError = {
                            code: reason.code,
                            message: reason.message,
                        };
                        reject(error);
                    });
            } catch (e) {
                const error: IAuthError = {
                    code: '501',
                    message: 'There has been an error with the password reset.',
                };
                reject(error);
            }
        });
    };

    private _sendVerificationEmail = async (currentUser: User) => {
        return new Promise<void>(async (resolve, reject) => {
            if (currentUser !== null && currentUser.emailVerified === false) {
                currentUser.sendEmailVerification().then(
                    function() {
                        resolve();
                    },
                    error => {
                        reject(error);
                    }
                );
            }
        });
    };

    private _createUserRecord = async (
        currentUser: User,
        email: string,
        firstName: string,
        lastName: string
    ) => {
        await fire
            .firestore()
            .collection(USER_COLLECTION)
            .doc(currentUser.uid)
            .set({
                email: email,
                firstName: firstName,
                lastName: lastName,
                isVerified: currentUser.emailVerified,
            });
    };
}

export default AuthService;
