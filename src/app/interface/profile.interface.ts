
export interface Profile {
    id: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    products: [{
        product_id: number,
        name: string,
        description: string,
        price: number,
        category: string,
        image: string,
        userId: string
    }]
}