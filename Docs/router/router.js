import Main from "../view/main"
export default [
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: {
            notCache: true
        },
        children: []
    },
]
