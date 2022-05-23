import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const taskCrud = () => {
    const route = useRoute();
    const router = useRouter();
    let taskId = route.params.id as string;
    const statusOptions = [
        'Not started' ,
        'In Progress' ,
        'Done' ,
    ];

    const taskState = ref({
        title: '' as string,
        description: '' as string,
        status: '' as string,
        deadline: '' as string | any,
        tags: [] as string[],
        assigned: [] as string[],
        id: '' as string,
        userTasks: [] as object[] | any,
        projectIds: [] as string[],
    })

    const getSpecificTask = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
            };
            await fetch(uri + 'tasks/' + taskId,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    taskState.value = data
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (_id: string, title: string, description: string, deadline: any, tags: string[], assigned: string[], status: string) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    title, description, deadline, tags, assigned, status
                })
            }
            console.log(_id)
            await fetch(uri + 'tasks/' + _id,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(router.currentRoute.value.name === 'project'){
                        //does nothing
                    }else{
                        router.go(-1)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const createTask = async (columnId: string) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title: taskState.value.title,
                description: taskState.value.description,
                deadline: taskState.value.deadline,
                tags: taskState.value.tags,
                assigned: taskState.value.assigned,
                status: 'Not started',
            })
        };

        await fetch(uri + 'tasks/' + columnId,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                router.go(0)
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
                taskState.value.userTasks = data.tasks
                taskState.value.projectIds = data.projectIds
            })
    }



    return {
        statusOptions,
        taskState,
        taskId,
        createTask,
        updateTask,
        getSpecificTask,
        getTasksFromUser
    }
}

export default taskCrud