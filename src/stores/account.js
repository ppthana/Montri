import { defineStore } from 'pinia'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase'
const provider = new GoogleAuthProvider()

export const useAccountStore = defineStore('account', {

    state: () => ({
        isLoggedIn: false,
        isAmin: false,
        user: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.user = user
                        this.isLoggedIn = true
                            // this.isAmin = true
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
                        throw new Error('Email ไม่ถูกต้อง')
                    default:
                        throw new Error('มีปัญหาในการ login')
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