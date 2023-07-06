<template>
    <form v-bind="$attrs" @submit.prevent="processForm">
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_description')" v-model="roleInfo.ROLE_DESCRIPTION" type="checkbox"/>
        <Dropdown :options="auraList"  v-model="roleInfo.AURA"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
    </form>
</template>

<script setup>
    const { ALIGNMENT: alignmentList, AURA: auraList, WIN_CONDITION, CATEGORY: categoryList, ACTION: actionList, USER_TYPES} = useDropdowns()

    console.log(auraList);
    const roleInfo = reactive({
        ROLE_NAME: '',
        ROLE_DESCRIPTION: '',
        AURA: '',
        ALIGNMENT: '',
        CAN_BE_KILLED_BY_MAFIA: false,
        WIN_CONDITION: '',
        HAS_NIGHT_ACTION: false,
        HAS_DAY_ACTION: false,
        CATEGORY: '',
        CAN_BE_MULTIPLE: false,
        INVESTIGATION_RES: {
            AURA: '',
            ALIGNMENT: '',
        },
        ICON_URL: ''
    })

    const action = reactive({
        ACTION_TITLE: '',
        ICON_URL: '',
        IMMEDIATE: false,
        IMMEDIATE_ACTION_FIELD: '' //The field that is toggled if the action is immediate
    })
</script>
