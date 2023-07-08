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
        <FormGroup :label="$t('can_be_multiple')" v-model="roleInfo.CAN_BE_MULTIPLE" type="checkbox"/>
        
    
        <div>
            <label for="investigation_responses">{{ $t('investigation_responses') }}</label>
            <div name="investigation_responses">
                <div>
                    <label for="investigation_res_aura">{{ $t('investigation_res_aura') }}</label>
                    <Dropdown :options="auraList"  v-model="roleInfo.INVESTIGATION_RES.AURA" name="investigation_res_aura"/>
                </div>
                <div>
                    <label for="investigation_res_alignment">{{ $t('investigation_res_alignment') }}</label>
                    <Dropdown :options="alignmentList"  v-model="roleInfo.INVESTIGATION_RES.ALIGNMENT" name="investigation_res_alignment"/>
                </div>
            </div>  
        </div>

        
        <!-- ACTIONS -->
        <div class="actions">
          <RoleAction
                v-for="(action, index) in actionArr"
            
                :actionTitle="action.ACTION_TITLE"
                :immediate="action.IMMEDIATE"
                :immediateActionField="action.IMMEDIATE_ACTION_FIELD"
                :isNightAction="action.IS_NIGHT_ACTION"
                @update:isNightAction="value => action.IS_NIGHT_ACTION = value"
                @update:immediateActionField="value => action.IMMEDIATE_ACTION_FIELD = value"
                @update:immediate="value => action.IMMEDIATE = value"
                @update:actionTitle="value => action.ACTION_TITLE = value"
                @remove="() => actionArr.splice(index, 1)"

            />
            <p>{{ actionArr }}</p>
            <Button @click="addAction">{{ $t('add_action') }}</Button>

        </div>
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
        const { subscribeCollection, getDocument, updateDocument,subscribeDocument } = useFirestore()

    /*
        GLOBAL VARIABLES
    */

        const roleDoc = ref()
        const actionArr = ref([])

        const roleInfo = reactive(
            {
                ROLE_NAME: '',
                ROLE_DESCRIPTION: '',
                AURA: '',
                ALIGNMENT: '',
                CATEGORY: '',
                WIN_CONDITION: '',                
                HAS_NIGHT_ACTION: false,
                HAS_DAY_ACTION: false,
                CAN_BE_KILLED_BY_MAFIA: false,
                CAN_BE_MULTIPLE: false,
                INVESTIGATION_RES: {
                    AURA: '',
                    ALIGNMENT: ''
                },
                ICON_URL: '',
                ACTIONS: []
            }
        )
     
        const action = {
            ACTION_TITLE: '',
            ICON_URL: '',
            IS_NIGHT_ACTION: true,
            IMMEDIATE: false,
            IMMEDIATE_ACTION_FIELD: '' //The field that is toggled if the action is immediate
        }

        /*
            COMPUTED ROLE VALUES
        */
            roleInfo.HAS_NIGHT_ACTION = computed(() => {
                return roleInfo.ACTIONS.filter(obj => obj.IS_NIGHT_ACTION === true).length > 0 ? true : false;
            })

            roleInfo.HAS_DAY_ACTION = computed(() => {
                return roleInfo.ACTIONS.filter(obj => obj.IS_NIGHT_ACTION === false).length > 0 ? true : false;
            })
    /*
        SSR
    */
        if(process.server && props.roleID){
            roleDoc.value = await useFetch('../api/roles/' + props.roleID)
            console.log(roleDoc.value);
        }
        
        watchEffect(() => {
            if(roleDoc.data){
                //TODO: populate all of the fields of roleInfo with data from firebase

            }
        })

        onMounted(async () => {
            // if(props.roleID){
            //     roleDoc.value = subscribeDocument('roles', props.roleID)
            // }
        })

        const addAction = () => {
            actionArr.value.push(action)
        }



</script>
