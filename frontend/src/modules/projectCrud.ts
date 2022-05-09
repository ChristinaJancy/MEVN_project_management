import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const projectCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const projectId = computed(() => route.params.id);

    const projectState = ref({
        projects: {},
        title: '',
        description: '',
        tags: [],
        id: '',
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

    return {
        projectState,
        projectId,
        getAllProjects,
        getSpecificProject
    }
}

export default projectCrud 