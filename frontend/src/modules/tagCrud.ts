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
    return {
        tagState,
        tagId,
        getAllTags
    }
}

export default tagCrud