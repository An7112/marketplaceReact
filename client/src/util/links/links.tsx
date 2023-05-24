import { sidebarModal } from 'modal/index'
import { CgShoppingBag, CgProfile } from 'react-icons/cg'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { FaStore } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'

export const linkList: Array<sidebarModal> = [
    {
        link: "overview",
        name: "overview",
        icon: <HiOutlineViewGrid style={{ fontSize: '18' }} />
    },
    {
        link: "product",
        name: "product",
        icon: <FiBox style={{ fontSize: '18' }} />
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
    {
        link: "store",
        name: "store",
        icon: <FaStore style={{ fontSize: '18' }} />
    }
]