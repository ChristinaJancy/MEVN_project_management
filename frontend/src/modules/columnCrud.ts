import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const columnCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const columnId = computed(() => route.params.id);

    const columnState = ref({
        title: '' as string,
        description: '' as string,
        tasks: [] as string[],
        id: '' as string,
        columns: [] as object[],
    })

    const getAllColumns = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'columns',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                columnState.value.columns = data
            })
    }

    const createColumn = (projectId: string, title: string) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title
            })
        }

        fetch(uri + 'columns/' + projectId,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                columnState.value.columns.push(data)
                console.log(data)
            })
    }
    const updateColumn = (columnId: string, title: string) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title
            })
        }

        fetch(uri + 'columns/' + columnId,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    const deleteColumn = (columnId: string) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        fetch(uri + 'columns/' + columnId,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    //For moving a task to a new column
    const moveTaskToNewColumn = async (columnId: string, taskId: string, taskIds: string[]) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    columnId,
                    taskId,
                    taskIds
                })
            }
            fetch(uri + 'columns/draggable/move',
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    //For moving a task inside its current column 
    const moveTaskInsideColumn = async (columnId: string, tasks: string[]) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    columnId, tasks
                })
            }
            await fetch(uri + 'columns/draggable/internal',
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
    }



    return {
        columnState,
        columnId,
        getAllColumns,
        createColumn,
        updateColumn,
        deleteColumn,

        moveTaskToNewColumn,
        moveTaskInsideColumn,
    }
}



export default columnCrud