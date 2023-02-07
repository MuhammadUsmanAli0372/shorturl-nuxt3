<template>
    <div class="card">
        <form @submit.prevent="handleLinkForm">
            <div class="flex gap-5 items-end">
                <div class="w-5/12">
                    <label for="url" class="text-white">Long URL</label>
                    <input v-model="url_form.long_url" type="text" id="url" placeholder="Paste or enter long URL">
                </div>
                <div class="w-5/12">
                    <label for="shortKey" class="text-white">Short Key</label>
                    <input v-model="url_form.key" type="text" id="shortKey" placeholder="Enter a key">
                </div>
                <div class="w-2/12">
                    <button class="btn py-3 rounded-lg w-full">Short</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { Database } from 'types/supabase';

const client = useSupabaseAuthClient<Database>();
const user = useSupabaseUser();

const url_form = reactive({
    long_url: '',
    key: '',
});

const emit = defineEmits(['created']);

const handleLinkForm = async () => {
    try {
        const { data, error } = await client.from('links').insert({
            long_url: url_form.long_url,
            key: url_form.key,
            user_id: user.value?.id
        });

        if (error) {
            alert(error.message);
            return;
        }

        createShortKey();
        url_form.long_url = '';
        alert('Link Created SuccessFully!');

        emit('created', 1);
    } catch (e) {
        console.log(e);
    }
}

const createShortKey = (len: number = 6): void => {
    url_form.key = nanoid(len);
}

onMounted(() => { 
    createShortKey();
});

</script>