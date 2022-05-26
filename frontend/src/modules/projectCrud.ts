import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'
import moment from 'moment'

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
        _id: '' as string,
        columns: {} as object | any,
        tasks: [] as string[],
        projectToEdit: {} as any,
        userProjects: [] as object[] | any,
        page: 1 as number,
        totalPages: 1 as number,
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

    //pagination
    const getProjects = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        const numOfItems = 2;
        const page = projectState.value.page;

        await fetch(uri + 'projects/page/' + page + '/' + numOfItems,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                projectState.value.projects = data
            })
        await fetch(uri + 'projects/total',
            requestOptions)
            .then(response => response.json())
            .then(data => {
                projectState.value.totalPages = Math.ceil(data / numOfItems)
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
        await fetch(uri + 'projects/' + projectId.value,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                projectState.value = data
                projectState.value.deadline = moment(data.deadline).format('YYYY-MM-DD')

            })
    }

    const getProjectsFromUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            }
        };

        await fetch(uri + 'projects/user/' + getCookie('id'),
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                projectState.value.userProjects = data
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

    const updateProjectColumns = async (_id: string, columns: string[]) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    columns
                })
            };
            await fetch(uri + 'projects/' + _id,
                requestOptions
            )
                .then(response => response.json())
                .then(data => {
                    console.log("data:", data);
                    getSpecificProject()
                })
        }
        catch (error) {
            console.log(error)
        }
    }
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
        deleteProject,
        updateProjectColumns,
        getProjectsFromUser,
        getProjects
    }
}

export default projectCrud 