import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { HiLanguage } from 'react-icons/hi2'
import { ImProfile } from 'react-icons/im'
import { MdSecurity, MdOutlineHelpOutline, MdContacts, MdOutlinePrivacyTip } from 'react-icons/md'

export const profileTop = [
    {
        text: 'Edit profile information',
        icon: <ImProfile />,
        status: true,
        button: true
    },
    {
        text: 'Notifications',
        icon: <IoIosNotificationsOutline />,
        status: true,
        button: true
    },
    {
        text: 'Language',
        icon: <HiLanguage />,
        status: true,
        button: true
    }
]

export const profileCenter = [
    {
        text: 'Security',
        icon: <MdSecurity />,
        status: false,
        button: false
    },
    {
        text: 'Theme',
        icon: <IoColorPaletteOutline />,
        status: true,
        button: true
    }
]

export const profileBottom = [
    {
        text: 'Help & Support',
        icon: <MdOutlineHelpOutline />,
        status: false,
        button: false
    },
    {
        text: 'Contact us',
        icon: <MdContacts />,
        status: false,
        button: false
    },
    {
        text: 'Privacy policy',
        icon: <MdOutlinePrivacyTip />,
        status: false,
        button: false
    }
]