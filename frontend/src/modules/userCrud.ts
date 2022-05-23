import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setCookie, getCookie, deleteCookie } from './cookie'
import { uri } from './uri'

const userCrud = () => {
    const route = useRoute();
    const router = useRouter();
    let userId = route.params.id as string;

    const state = ref({
        name: '' as string,
        email: '' as string,
        initials: '' as string,
        password: '' as string,
        token: '' as string,
        roles: [] as object[] | any,
        userColor: '' as string | any,
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
           await  fetch(uri + 'users/' + userId,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    state.value = data
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    const newUser = () => {
        const roleIds = state.value.roles.map(role => role._id) as string[]
        console.log(roleIds)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.value.email,
                password: state.value.password,
                name: state.value.name,
                roles: roleIds
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

    const updateUser = (_id: string, name: string, email: string, roles: object[]) => {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    name, email, roles
                })
            }
            fetch(uri + 'users/' + _id,
                requestOptions,
            )
                .then(response => response.json())
                .then(data => {
                    console.log("data:", data);
                    router.go(-1)
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
        await fetch(uri + 'users/login',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log("json:", data);
                data.token ? state.value.token = data.token : console.log("no token");
                data.id ? state.value.id = data.id : console.log("no id");
                data.initials ? state.value.initials = data.initials : console.log("no initials");
                data.userColor[0].color ? state.value.userColor = data.userColor[0].color : state.value.userColor = "#0046E5" ;
                
                setCookies()
                router.push({ path: "/", replace: true })
            })
    }

    const logoutUser = () => {
        deleteCookie('id')
        deleteCookie('email')
        deleteCookie('token')
        deleteCookie('initials')
        deleteCookie('userColor')
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
            .then(() => {
                //if the user that is logged in is the user that is being deleted, log them out
                if (_id === getCookie('id') ) {
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
        setCookie('initials', state.value.initials, 1)
        setCookie('userColor', state.value.userColor, 1)
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