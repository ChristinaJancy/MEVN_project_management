import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setCookie, getCookie, deleteCookie } from './cookie'
import { uri } from './uri'

const userCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);

    const state = ref({
        name: '' as string | string[] | any,
        email: '' as string | any,
        initials: '' as string | any,
        img: '' as string | any,
        password: '' as string | any,
        token: '' as string | any,
        roles: [] as string[],
        users: {} as { [key: string]: any },
        id: '' as string,
    })

    const getAllUsers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'users',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                state.value.users = data
            })
    }

    const getSpecificUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
            };
            fetch(uri + 'users',
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    // user.value = data.filter((user: { _id: string | string[]; }) => user._id === userId.value)
                    state.value = data.filter(((state: { _id: string | string[]; }) => state._id === userId.value)
                    )
                })
        }
        catch (error) {
            console.log(error)
        }
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
        fetch(uri + 'users/register',
            requestOptions
        )
            .then(data => {
                console.log("data:", data);
                router.push({ path: "/", replace: true })
            })
    }

    const updateUser = (_id: string, name: string, email: string) => {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    name, email
                })
            }
            fetch(uri + 'users/' + _id,
                requestOptions,
            )
                .then(response => response.json())
                .then(data => {
                    console.log("data:", data);
                    // debugger
                    router.push({ path: "/", replace: true })
                })
        }

        catch (error) {
            console.log("error:", error);
        }


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
        fetch(uri + 'users/login',
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

    const logoutUser = () => {
        deleteCookie('id')
        deleteCookie('email')
        deleteCookie('token')

        router.push({ path: "/login", replace: true })
    }

    //A user can delete any user as long as they are logged in.
    const deleteUser = (_id: string) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie('token')
            },
        }
        fetch(uri + 'users/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                //if the user that is logged in is the user that is being deleted, log them out
                if (data = _id) {
                    logoutUser()
                }
                else {
                    getAllUsers()
                }
            })
    }

    const setCookies = () => {
        setCookie('id', state.value.id, 1)
        setCookie('email', state.value.email, 1)
        setCookie('token', state.value.token, 1)
    }

    return {
        state,
        userId,
        getAllUsers,
        getSpecificUser,
        newUser,
        loginUser,
        logoutUser,
        deleteUser,
        updateUser,
        setCookie
    }
}

export default userCrud 