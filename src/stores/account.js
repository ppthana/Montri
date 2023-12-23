import { defineStore } from 'pinia'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'
const provider = new GoogleAuthProvider()

export const useAccountStore = defineStore('account', {

    state: () => ({
        isLoggedIn: false,
        isAmin: false,
        user: {},
        profile: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async(user) => {
                    if (user) {
                        this.user = user
                        console.log('user', user)

                        const docRef = doc(db, 'users', user.uid)
                        const docSnap = await getDoc(docRef)

                        if (docSnap.exists()) {
                            this.profile = docSnap.data()
                        } else {
                            const newUser = {
                                fullname: user.displayName,
                                role: 'staff',
                            }
                            await setDoc(docRef, newUser)
                            this.profile = newUser
                        }
                        console.log('Profile', this.profile)
                        if (this.profile.role === 'admin') {
                            this.isAmin = true
                        }
                        this.isLoggedIn = true
                        this.profile.email = user.email
                        resolve(true)

                    } else {
                        resolve(false)
                    }
                })
            })
        },
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider)
                this.isLoggedIn = true
                this.user = result.user

            } catch (error) {
                console.log('error', error)
            }
        },
        async updateProfile(userData) {
            try {
                const updateUserData = {
                    fullname: userData.fullname,
                    imageUrl: userData.imageUrl
                }
                const userRef = doc(db, `users/${this.user.uid}`)
                await updateDoc(userRef, updateUserData)
            } catch (e) {
                console.log('error', e)
            }

        },
        async signInAdmin(email, password) {
            try {
                const result = signInWithEmailAndPassword(auth, email, password)
                this.isLoggedIn = true
                this.isAmin = true
                this.user = result.user
            } catch (error) {
                console.log('error', error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        throw new Error('Invalid email')
                    case 'auth/wrong-password':
                        throw new Error('Wrong password')
                    default:
                        throw new Error('Login invalid')
                }
            }
        },
        async logout() {
            this.isLoggedIn = false
            this.isAmin = false
            await signOut(auth)
        }
    }


})