<template>
    <form v-bind="$attrs" @submit.prevent="processForm">
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="text"/>
        <FormGroup :label="$t('role_description')" v-model="roleInfo.ROLE_DESCRIPTION" type="text"/>

        <div>
            <label for="role_aura">{{ $t('role_aura') }}</label>
            <Dropdown name="role_aura" :options="auraList"  v-model="roleInfo.AURA"/>
        </div>
        <div>
            <label for="role_alignment">{{ $t('role_alignment') }}</label>
            <Dropdown :options="alignmentList"  v-model="roleInfo.ALIGNMENT" name="role_alignment"/>
        </div>
        <div>
            <label for="role_category">{{ $t('role_category') }}</label>
            <Dropdown :options="categoryList"  v-model="roleInfo.CATEGORY" name="role_category"/>
        </div>
        <div>
            <label for="role_winCondition">{{ $t('role_winCondition') }}</label>
            <Dropdown :options="WIN_CONDITION"  v-model="roleInfo.WIN_CONDITION" name="role_winCondition"/>
        </div>

        <FormGroup :label="$t('can_be_killed_by_mafia')" v-model="roleInfo.CAN_BE_KILLED_BY_MAFIA" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
        <FormGroup :label="$t('role_name')" v-model="roleInfo.ROLE_NAME" type="checkbox"/>
    </form>
</template>

<script setup>
    /*
        PROPS
    */
        const props = defineProps({
            roleID: String
        })

    /*
        IMPORTS    
    */
        const { ALIGNMENT: alignmentList, AURA: auraList, WIN_CONDITION, CATEGORY: categoryList, ACTION: actionList} = useDropdowns()
        const { subscribeCollection, getDocument, updateDocument } = useFirestore()

    /*
        GLOBAL VARIABLES
    */

        const roleDoc = ref(null)
        
        const roleInfo = reactive({
            ROLE_NAME: '',
            ROLE_DESCRIPTION: '',
            AURA: '',
            ALIGNMENT: '',
            CATEGORY: '',
            WIN_CONDITION: '',
            CAN_BE_KILLED_BY_MAFIA: false,
            HAS_NIGHT_ACTION: false,
            HAS_DAY_ACTION: false,
            CAN_BE_MULTIPLE: false,
            INVESTIGATION_RES: {
                AURA: '',
                ALIGNMENT: '',
            },
            ICON_URL: ''
        })
     
        const action = {
            ACTION_TITLE: '',
            ICON_URL: '',
            IMMEDIATE: false,
            IMMEDIATE_ACTION_FIELD: '' //The field that is toggled if the action is immediate
        }

    /*
        SSR
    */
        if(process.server && roleID){
            roleDoc = await useFetch('../api/roles/' + props.roleID)
        }
        
        watchEffect(() => {
            if(roleDoc.data){
                //TODO: populate all of the fields of roleInfo with data from firebase

            }
        })



    const actions = ref([])

</script>
