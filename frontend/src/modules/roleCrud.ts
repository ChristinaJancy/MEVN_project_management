import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const roleCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const roleId = computed(() => route.params.id);

    const roleState = ref({
        title: '' as string,
        color: '' as string,
        id: '' as string,
        roles: [] as string[]
    })

    const getAllRoles = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'roles',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                roleState.value.roles = data
            })
    }
    const createRole = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title: roleState.value.title,
                color: roleState.value.color
            })
        };
        await fetch(uri + 'roles',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log("data:", data);
                router.push({ path: "/roles", replace: true })
            })
    }

    const updateRole = (_id: string, title: string, color: string) => {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    title, color
                })
            }
            fetch(uri + 'roles/' + _id,
                requestOptions,
            )
                .then(response => response.json())
                .then(() => {
                    getAllRoles();
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteRole = (_id: string) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie('token')
            },
        }
        fetch(uri + 'roles/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(() => {
                getAllRoles();
            })
    }

    return {
        roleState,
        roleId,
        getAllRoles,
        createRole,
        updateRole,
        deleteRole
    }
}

export default roleCrud