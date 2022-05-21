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
        status: '' as string,
        deadline: '' as string,
        tags: [] as string[],
        assigned: [] as string[],
        id: '' as string,
        userTasks: [] as object[],
    })

    const updateTask = async (_id: string, name: string, description: string, status: string, tags: string[], assigned: string[]) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('auth-token')
            },
            body: JSON.stringify({
                name, description, status, tags, assigned
            })
        }
        await fetch(uri + 'tasks/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    const createTask = async (columnId: string) => {
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
                status: 'not started'
            })
        };

        await fetch(uri + 'tasks/' + columnId,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {

                console.log(data)
            })
    }

    const getTasksFromUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            }
        };

        await fetch(uri + 'tasks/user/' + getCookie('id'),
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                taskState.value.userTasks = data
            })
        }
    


    return {
        taskState,
        createTask,
        updateTask,
        getTasksFromUser
    }
}

export default taskCrud