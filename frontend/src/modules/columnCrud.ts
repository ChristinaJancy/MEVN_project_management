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
        tasks: [] as string[]
    })

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
            fetch(uri + 'columns/draggable/internal',
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
        moveTaskToNewColumn,
        moveTaskInsideColumn
    }
}



export default columnCrud