<template>
    <section class="h-screen grid place-content-center">
        <div class="container">
            <!-- Card -->
            <div class="card">
                <div class="flex justify-center">
                    <div class="flex justify-center w-20 h-20 items-center rounded-full border shadow-xl border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                </div>
                <button class="btn py-3 w-full rounded-full mt-5" @click="handleGithubLogin">
                    Continue With Github
                </button>
                <hr class="border-white/10 my-8"/>

                <form @submit.prevent="handleLoginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="form.email" type="email" name="email" id="email" placeholder="usman@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="form.password" type="password" name="password" id="password">
                    </div>
                    <button
                        type="submit"
                        class="btn w-full py-3 rounded-full my-5"
                    >
                        <template v-if="isLoggingIn">Login</template>
                        <template v-else>Signup</template>
                    </button>

                    <div class="text-center mt-5">
                        <button 
                            type="button"
                            class="text-center"
                            @click="isLoggingIn = !isLoggingIn"
                        >
                            <template v-if="isLoggingIn">Don't have a account? Signup</template>
                            <template v-else>Already have account? login</template>
                        </button>
                    </div>

                    <div class="text-red-500 text-center mt-5">
                        {{ errors }}
                    </div>
                </form>

            </div>
            <!-- ./ Card -->
        </div>
    </section>
</template>

<script lang="ts" setup>

const supabaseAuth = useSupabaseAuthClient();

const isLoggingIn = ref<boolean>(true);

const form = reactive({
    email: '',
    password: '',
});

const errors = ref<string>('');

const isLoading = ref(false);

const handleGithubLogin = () => {
    // supabaseAuth.auth.signInWithOAuth({
    //     provider: 'github'
    // });
    const { auth } = useSupabaseAuthClient();
    try {
        isLoading.value = true;
        auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: "http://localhost:3000",
        },
        });
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

const handleLoginForm = async () => {
    if (!form.email || !form.password) {
        errors.value = 'Please fill all the field';
        return;
    }

    if (!isLoggingIn.value) {
        return handleSignup();
    }

    try {
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email: form.email,
            password: form.password
        });

        if (error) {
            errors.value = error.message;
            return;
        }

        errors.value = '';

        useRouter().push({
            name: 'dashboard'
        });
    } catch (err) {
        errors.value = 'Something went wrong'
    }
}

const handleSignup = async () => {
    try {
        const { data, error } = await supabaseAuth.auth.signUp({
            email: form.email,
            password: form.password
        });

        if (error) {
            errors.value = error.message;
            return;
        }

        errors.value = "Please check your email to verify yoour account";
    } catch (err) {
        errors.value = 'Something went wrong'
    }
}

</script>
