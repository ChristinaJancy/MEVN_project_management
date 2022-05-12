import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const projectCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const projectId = computed(() => route.params.id);

    const projectState = ref({
        projects: {} as { [key: string]: any },
        project: {} as any,
        title: '' as string | any,
        description: '' as string | any,
        tags: [] as string[],
        id: '' as string,
        columns: [] as string[],
        tasks: [] as string[]
    })

    const getAllProjects = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        fetch(uri + 'projects',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                projectState.value.projects = data
            })
    }

    const getSpecificProject = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        fetch(uri + 'projects',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                // user.value = data.filter((user: { _id: string | string[]; }) => user._id === userId.value)
                projectState.value = data.filter(((projectState: { _id: string | string[]; }) => projectState._id === projectId.value)
                )
            })
    }

    const updateProjectDetails = (_id: string, title: string, description: string, deadline:any, tags: any) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    title, 
                    description, 
                    deadline,
                    tags
                })
            };
            fetch(uri + 'projects/' + _id,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    // in progess
    const createProject = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({

            })
        };
        fetch(uri + 'projects',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }


    // in progress
    const deleteProject = async (_id: string) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "auth-token": getCookie('token')
            }
        };
        fetch(uri + 'projects/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    //-----tasks---------

    return {
        projectState,
        projectId,
        getAllProjects,
        getSpecificProject,
        updateProjectDetails,
        createProject,
        deleteProject
    }
}

export default projectCrud 