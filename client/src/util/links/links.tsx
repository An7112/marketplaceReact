import { sidebarModal } from 'modal/index'
import { CgShoppingBag, CgProfile } from 'react-icons/cg'
import { HiOutlineViewGrid } from 'react-icons/hi'
// import { FiBox } from 'react-icons/fi'

export const linkList: Array<sidebarModal> = [
    {
        link: "collection",
        name: "collection",
        icon: <HiOutlineViewGrid style={{ fontSize: '18' }} />
    },
    {
        link: "profile",
        name: "profile",
        icon: <CgProfile style={{ fontSize: '18' }} />
    },
    {
        link: "create",
        name: "create",
        icon: <CgShoppingBag style={{ fontSize: '18' }} />
    },
]