<template>
    <div class="card">
        <div class="card-body">
            <div class="flex flex-col items-center">
                    <!-- TODO: style error-->
                <h2 v-if="showError">{{ showError }}</h2>
                <form class="flex flex-col items-center">
                    <img :src="userIcon" class="w-24 h-24 rounded-full" />
                    <h1 class="text-2xl font-bold mt-2">{{ displayName }}</h1>
                    <div>
                        <label for="emailInput">{{ $t("email") }}</label>
                        <InputWithCopy :value="email" name="emailInput"/>
                    </div>
                    <div>
                        <label for="userIdInput">{{ $t("user_id") }}</label>
                        <InputWithCopy :value="userId" name="userIdInput"/>
                    </div>
                    <div>
                        <label for="accessLevelDrop">{{ $t("access_level") }}: </label>
                        <!-- TODO: fix props or emits, does not update properly -->
                        <Dropdown 
                            :options="userTypes" 
                            v-model="userForm.userAccessLevel"
                            name="accessLevelDrop"
                            @update:modelValue="(val) => userForm.userAccessLevel = val"
                        />
                    </div>
                    <div class="text-center">
                        <!-- TODO: Add dynamic buttons -->
                        <Button class="bg-blue-500 text-white w-56" type="submit" @click.prevent="handleSave">{{$t("save")}}</Button>
                    </div>
                </form>
      
            </div>
        </div>
    </div>
</template>

<script setup>

    const { updateDocument } = useFirestore()
    const showError = ref("")
    const isPending = ref(false)
    const props = defineProps({
        displayName: String,
        email: String,
        accessLevel: Number,
        userIcon: String,
        userId: String,
        modelValue: Number
    })

    const userForm = reactive({
        userAccessLevel: 0
    })

    const userTypes = ref([
        { text: '0 - Banned user', value: 0 },
        { text: '1 - User with an account', value: 1 },
        { text: '2 - Premium user', value: 2 },
        { text: '3 - Admin', value: 3 },
        { text: '4 - Super admin', value: 4 },
    ]);

    function checkAccessLevelRange(input) {
        return /^[0-4]$/.test(input);
    }

    onMounted(() => {
        userForm.userAccessLevel = props.accessLevel
    })

    const saveUpdates = async () => {
        console.log(userForm);
        await updateDocument("users", props.userId, {
            accessLevel: userForm.userAccessLevel
        })
    }

    const handleSave = () => {
        console.log('saving');
        isPending.value = true
        if(checkAccessLevelRange(userForm.userAccessLevel)){
            console.log('saving');
            saveUpdates()
            // navigateTo(localPath('/dashboard'))
        }
        else{
            showError.value = 'Username can only contain letters (a-Z)'
        }
        isPending.value = false
    }

</script>
