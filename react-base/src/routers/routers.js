import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/Client/HomePage/Home'))
    },
    {
        path: '/admin',
        component:  lazy(() => import('@components/Admin/HomePage/Home'))
    },
    {
        path: '/admin/seat',
        component:  lazy(() => import('@components/Admin/SeatPage/Seat'))
    }
];

export default routers;