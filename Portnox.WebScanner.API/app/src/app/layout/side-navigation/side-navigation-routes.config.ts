import { NavigationModel } from "../../model/navigation/navigation.model";


export const MenuItems: NavigationModel[] = [
    {
        label: 'בית',
        icon: 'home',
        items: [
            {
                label: 'Home',
                link: '/home',
                icon: 'homw',
            },
            {
                label: 'Users',
                link: '/users',
                icon: 'list',
            },
            {
                label: 'Roles',
                link: '/roles',
                icon: 'list',
            }
        ],
    },
    {
        label: 'התחברות',
        link: '/login',
        icon: 'bookmark',
        items: [
            {
                label: 'קישור שני',
                link: '/home2',
                icon: 'list',
            }
        ]
    },
    {
        label: 'משתמשים',
        link: '/users',
        icon: 'group',
    }
];
