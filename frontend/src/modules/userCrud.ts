import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const getUsers = () => {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);
    console.log("userId:", userId);

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
                avatarPicture: 'img',
            })
        }
        debugger
        fetch("http://localhost:4000/api/users/register",
            requestOptions
        )
    }

    const user = ref({})

    return {
        state,
        user,
        userId,
        newUser
    }
}

export default getUsers 