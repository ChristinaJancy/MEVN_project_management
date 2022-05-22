<template>
    <div class="bg-gray-100 max-w-full w-full md:w-5/12 md:max-w-2xl p-4 rounded-lg space-y-3 shadow-lg">
        <h3 class="m-1">Your tasks</h3>

        <div class="max-h-96 overflow-y-scroll space-y-3 w-full">
            <div v-for="(task, index) in taskState.userTasks" :key="task"
                class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-2">
                <router-link :to="{ name: 'project', params: { id: taskState.projectIds[index] } }">
                    <p class="font-medium text-xl">{{ task.name }}</p>
                    <!-- <p class="font-bold text-md">Description:</p> -->
                    <p class="font-light" >{{ task.description }}</p>
                    <p class="italic font-normal">Deadline: {{ moment(task.deadline).startOf('hour').fromNow() }}</p>
                    <div class="font-bold text-sm inline-flex" v-for="(user, index) in task.assigned" :key="user">
                        <p>{{ user.name }}</p>
                        <div v-if="index < task.assigned.length - 1">
                            , &nbsp;
                        </div>
                    </div>
                </router-link> 
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import taskCrud from "../modules/taskCrud";
import moment from "moment";

export default {
    setup() {
        const { taskState, getTasksFromUser } = taskCrud();

        getTasksFromUser();
        return {
            moment,
            taskState
        };
    }
}
</script>