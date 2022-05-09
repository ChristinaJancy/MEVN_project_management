import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'

const projectCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const projectId = computed(() => route.params.id);

    const state = ref({
        projects: {},
    })
    const project = ref({})

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
                state.value.projects = data
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
                project.value = data.filter(((project: { _id: string | string[]; }) => project._id === projectId.value)
                )
            })
    }

    return {
        state,
        projectId,
        getAllProjects,
        getSpecificProject
    }
}

export default projectCrud 