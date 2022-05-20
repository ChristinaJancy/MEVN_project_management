import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const taskCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const taskId = computed(() => route.params.id);

    const taskState = ref({
        name: '' as string,
        description: '' as string,
        deadline: '' as string,
        tags: [] as string[],
        assigned: [] as string[],
        id: '' as string,
    })

    const createTask = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                name: taskState.value.name,
                description: taskState.value.description,
                deadline: taskState.value.deadline,
                tags: taskState.value.tags,
                assigned: taskState.value.assigned,

            })
        };
        await fetch(uri + 'tasks',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                router.push('/tasks')
            })
    }


    return {
        taskState,
        createTask
    }
}

export default taskCrud 