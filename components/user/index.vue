<template>
    <div class="card">
        <div class="card-body">
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <img :src="userIcon" class="w-24 h-24 rounded-full" />
                    <h1 class="text-2xl font-bold mt-2">{{ displayName }}</h1>
                    <div>
                        <label for="email">{{ $t("email") }}</label>
                        <InputWithCopy :value="email" name="email"/>
                    </div>
                    <div>
                        <label for="email">{{ $t("user_id") }}</label>
                        <InputWithCopy :value="userId" name="userId"/>
                    </div>
                    <div>
                        <label for="userTypes">{{ $t("access_level") }}: </label>
                        <Dropdown 
                            :options="userTypes" 
                            v-model="userForm.userAccessLevel"
                            name="userTypes"
                        />
                    </div>
                </div>
      
            </div>
        </div>
    </div>
</template>

<script setup>
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

function checkAccessLevel(input) {
  return /^[1-4]$/.test(input);
}

onMounted(() => {
    userForm.userAccessLevel = props.accessLevel
})

</script>
