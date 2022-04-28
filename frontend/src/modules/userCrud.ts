import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setCookie, getCookie } from './cookie'

const getUsers = () => {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);

    const state = ref({
        email: '',
        password: '',
        name: '',
        token: '',
        users: {},
        id: ''
    })
    const user = ref({})
    const getAllUsers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        fetch("http://localhost:4000/api/users",
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                state.value.users = data
            })
    }

    const getSpecificUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        fetch(`http://localhost:4000/api/users/`,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                // user.value = data.filter((user: { _id: string | string[]; }) => user._id === userId.value)
                user.value = data.filter(((user: { _id: string | string[]; }) => user._id === userId.value)
                )
            })
    }

    const newUser = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "auth-token": state.token
            },
            body: JSON.stringify({
                email: state.value.email,
                password: state.value.password,
                name: state.value.name,
                avatarPicture: 'img'
            })
        }
        fetch("http://localhost:4000/api/users/register",
            requestOptions
        )
            .then(data => {
                console.log("data:", data);
                router.push({ path: "/", replace: true })
            })
    }

    const loginUser = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: state.value.email,
                password: state.value.password
            })
        }
        fetch("http://localhost:4000/api/users/login",
            requestOptions
        )
            .then(response => response.json())

            .then(data => {
                console.log("json:", data);
                data.token ? console.log("have Cvookie " + data.token) : console.log("no token");

                data.id ? console.log("id: " + data.id) : console.log("no id");
                state.value.token = data.token
                state.value.id = data.id;

                setCookies()
                router.push({ path: "/", replace: true })
            })
    }

    const setCookies = () => {
        setCookie('id', state.value.id, 1)
        setCookie('name', state.value.name, 1)
        setCookie('email', state.value.email, 1)
        setCookie('token', state.value.token, 1)
    }


    return {
        state,
        user,
        userId,
        getAllUsers,
        getSpecificUser,
        newUser,
        loginUser,
        setCookie
    }
}

export default getUsers 