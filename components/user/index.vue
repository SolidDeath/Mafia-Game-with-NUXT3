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
                        <Label>{{ $t("email") }}</Label>
                        <InputWithCopy :value="email" name="emailInput"/>
                    </div>
                    <div>
                        <Label>{{ $t("user_id") }}</Label>
                        <InputWithCopy :value="userId" name="userIdInput"/>
                    </div>
                    <FormGroup :label="$t('username')" v-model="userDisplayName" type="text"/>
                    <div>
                        <Label>{{ $t("access_level") }}: </Label>
                        <Dropdown 
                            :options="userTypes" 
                            v-model:currentValue="userAccessLevel"
                        />
                    </div>
                    <div class="text-center">
                        <!-- TODO: Add dynamic buttons -->
                        <Button class="bg-blue-500 text-white w-56" type="submit" @click.prevent="handleSave">{{$t(buttonValue)}}</Button>
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
    const buttonValue = ref('save')
    const props = defineProps({
        displayName: String,
        email: String,
        accessLevel: Number,
        userIcon: String,
        userId: String,
    })

    const userAccessLevel = ref(0)
    const userDisplayName = ref('')

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
        userAccessLevel.value = props.accessLevel
        userDisplayName.value = props.displayName
    })

    watchEffect(() => {
        if(isPending == true){
            buttonValue.value = 'saving'
        }
        else{
            buttonValue.value = 'save'
        }
    })

    const saveUpdates = async () => {
        await updateDocument("users", props.userId, {
            displayName: userDisplayName.value,
            accessLevel: Number(userAccessLevel.value)
        })
    }

    const handleSave = () => {
        isPending.value = true
        if(checkAccessLevelRange(userAccessLevel.value)){
            saveUpdates()
            // navigateTo(localPath('/dashboard'))
        }
        else{
            showError.value = 'Username can only contain letters (a-Z)'
        }
        isPending.value = false
    }

</script>
