export default interface cardModelInterface {
    id_carte: string
    cartEmail: string
    cartNumber: string
    month: string
    year: number
    isDefault: Boolean

    insert() : void
}