import { ref } from 'vue'
import router from '../router'
import { getCookie } from './cookie'
import { uri } from './uri'

const templateCrud = () => {

    const templateState = ref({
        title: '' as string,
        description: '' as string,
        id: '' as string,
        templates: [] as object[] | any,
        columns: [] as object[] | undefined | any,
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

    const updateTemplate = async (_id: string, title: string, description: string, columns: string[]) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title,
                description,
                columns
            })
        };
        await fetch(uri + 'project-templates/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
               alert ('Template updated')
            })
    }

    const createTemplate = async () => {
        console.log (templateState.value, 'somegid')
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                title: templateState.value.title,
                description: templateState.value.description,
                columns: templateState.value.columns
            })
        };
        await fetch(uri + 'project-templates',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
                router.go(-1)
            })
    }

    const deleteTemplate = async (_id: string) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'project-templates/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    return {
        templateState,
        getAllTemplates,
        updateTemplate,
        deleteTemplate,
        createTemplate
    }
}



export default templateCrud