import { defineStore } from 'pinia'
import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore/lite'
import { db } from '@/firebase'

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        async loadProduct() {
            // const products = localStorage.getItem('admin-products')
            // const productSnapshot = await getDocs(collection(db, 'products'))
            // const products = productSnapshot.docs.map(doc => doc.data())

            // if (products.length > 0) {
            //     this.list = products
            //     this.loaded = true
            // }
            const productCol = collection(db, 'products')
            const productSnapshot = await getDocs(productCol)
            const products = productSnapshot.docs.map(doc => {
                const convertedProduct = doc.data()
                convertedProduct.productId = doc.id
                convertedProduct.updatedAt = convertedProduct.updatedAt.toDate()
                return convertedProduct
            })
            this.list = products
        },
        async showProduct() {
            const productCol = query(collection(db, 'products'), where('status', '==', 'open'))
            const productSnapshot = await getDocs(productCol)
            const products = productSnapshot.docs.map(doc => {
                const convertedProduct = doc.data()
                convertedProduct.productId = doc.id
                convertedProduct.updatedAt = convertedProduct.updatedAt.toDate()
                return convertedProduct
            })
            this.list = products

        },
        async getProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId)
                const productSnapshot = await getDoc(productRef)
                return productSnapshot.data()
            } catch (error) {
                console.log('error', error)
            }
            return this.list[productId]
        },

        async addProduct(productData) {
            try {
                productData.remainQuantity = productData.quantity
                productData.updatedAt = new Date()
                const productCol = collection(db, 'products')
                await addDoc(productCol, productData)
            } catch (error) {
                console.log('error', error)
            }

        },

        async updateProduct(productId, productData) {
            try {
                const updateProduct = {}
                updateProduct.image = productData.image
                updateProduct.partname = productData.partname
                updateProduct.subname = productData.subname
                updateProduct.motobrand = productData.motobrand
                updateProduct.mototype = productData.mototype
                updateProduct.partbrand = productData.partbrand
                updateProduct.price = productData.price
                updateProduct.quantity = productData.quantity
                updateProduct.remainQuantity = productData.quantity
                updateProduct.details = productData.details
                updateProduct.status = productData.status
                updateProduct.updatedAt = new Date()
                updateProduct.expiredDate = productData.expiredDate

                const productRef = doc(db, 'products', productId)
                await setDoc(productRef, updateProduct)
            } catch (error) {
                console.log('error', error)
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId)
                await deleteDoc(productRef)
            } catch (error) {
                console.log('error', error)
            }
        }
    }
})