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
        deadline: '' as string | any,
        description: '' as string | any,
        tags: [] as string[] | any,
        assigned: [] as string[] | any,
        id: '' as string,
        columns: [] as string[],
        tasks: [] as string[],
        projectToEdit: {} as any,
    })

    const getAllProjects = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'projects',
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
        await fetch(uri + 'projects',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                // user.value = data.filter((user: { _id: string | string[]; }) => user._id === userId.value)
                projectState.value = data.filter(((projectState: { _id: string | string[]; }) => projectState._id === projectId.value)
                )
            })
    }

    const updateProjectDetails = (_id: string, title: string, description: string, deadline: any, tags: string[], assigned: string[]) => {
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
                    tags,
                    assigned
                })
            };
            fetch(uri + 'projects/' + _id,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log("data:", data);
                    router.push({ path: "/projects", replace: true })
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    // in progess

    // tags: ["627e281e1e7b024e2517e60d", "627e28881e7b024e2517e60f", "627e28bb1e7b024e2517e611"],
    // assigned: ["6278fcec6b9f24120c8a73d4", "62738fd19ef44f7d4e422250"]

    const createProject = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title: projectState.value.title,
                deadline: projectState.value.deadline,
                description: projectState.value.description,
                columns: projectState.value.columns,
                tags: projectState.value.tags,
                assigned: projectState.value.assigned
            })
        };
        await fetch(uri + 'projects',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log("data:", data);
                router.push({ path: "/projects", replace: true })
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
            .then(getAllProjects)
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