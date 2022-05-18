import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCookie } from './cookie'
import { uri } from './uri'


const tagCrud = () => {
    const route = useRoute();
    const router = useRouter();
    const tagId = computed(() => route.params.id);

    const tagState = ref({
        name: '' as string,
        color: '' as string,
        id: '' as string,
        tags: [] as string[]
    })


    const getAllTags = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
        };
        await fetch(uri + 'tags',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                tagState.value.tags = data
            })
    }

    const createTag = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getCookie('token')
            },
            body: JSON.stringify({
                name: tagState.value.name,
                color: tagState.value.color
            })
        };
        await fetch(uri + 'tags',
            requestOptions
        )
            .then(response => response.json())
            .then(data => {
                console.log("data:", data);
                router.push({ path: "/tags", replace: true })
            })
    }

    const updateTag = (_id: string, name: string, color: string) => {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie('token')
                },
                body: JSON.stringify({
                    name, color
                })
            }
            fetch(uri + 'tags/' + _id,
                requestOptions,
            )
                .then(response => response.json())
                .then(() => {
                    getAllTags();
                })
        }

        catch (error) {
            console.log("error:", error);
        }
    }

    const deleteTag = (_id: string) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie('token')
            },
        }
        fetch(uri + 'tags/' + _id,
            requestOptions
        )
            .then(response => response.json())
            .then(() => {
                getAllTags();
            })
    }
    return {
        tagState,
        tagId,
        getAllTags,
        createTag,
        deleteTag,
        updateTag
    }
}

export default tagCrud