import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const roleCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const roleId = computed(() => route.params.id);

    const roleState = ref({
        name: '' as string,
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
    return {
        roleState,
        roleId,
        getAllRoles
    }
}

export default roleCrud