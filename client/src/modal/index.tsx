export type sidebarModal = {
    link: string,
    name: string,
    icon: any,
}

export type StoreInfoModal = {
    _id: string,
    storeName: string,
    storeDescription: string,
    storeAvatar: string,
    storeBanner: string,
    storeProductLength: number,
    date: any
}

export type Messages = {
    title: string | null,
    description?: string | null,
    status: boolean | null,
}