import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setCookie } from './cookie'

const getUsers = () => {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);
    // console.log("userId:", userId);

    const state = ref({
        email: '',
        password: '',
        name: ''
    })

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
    const user = ref({})
    
    const loginUser = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'auth-token': state.value.token
            },
            body: JSON.stringify({
                email: state.value.email,
                password: state.value.password
            })
        }
        fetch("http://localhost:4000/api/users/login",
            requestOptions
        )
            .then(data => {
                console.log("data:", data);
                setCookies()
                router.push({ path: "/", replace: true })
            })
    }

    const setCookies = () => {
        setCookie('name', state.value.name, 1)
        setCookie('email', state.value.email, 1)
    }

    return {
        state,
        user,
        userId,
        newUser,
        loginUser,
        setCookie
    }
}

export default getUsers 