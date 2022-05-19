import { ref } from 'vue'
import { getCookie } from './cookie'
import { uri } from './uri'

const templateCrud = () => {

    const templateState = ref({
        title: '' as string,
        description: '' as string,
        id: '' as string,
        templates: [] as object[]
    })

    const getAllTemplates = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'project-templates',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                templateState.value.templates = data
            })

    }
    return {
        templateState,
        getAllTemplates
    }
}



export default templateCrud