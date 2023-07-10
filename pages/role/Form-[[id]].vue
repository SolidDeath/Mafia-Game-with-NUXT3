<template>
    <p> {{ roleDoc }}</p>
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
                :key="index"
            
                :actionTitle="actionArr[index].ACTION_TITLE"
                :immediate="actionArr[index].IMMEDIATE"
                :immediateActionField="actionArr[index].IMMEDIATE_ACTION_FIELD"
                :isNightAction="actionArr[index].IS_NIGHT_ACTION"
                v-model:isNightAction="actionArr[index].IS_NIGHT_ACTION"
                v-model:immediateActionField="actionArr[index].IMMEDIATE_ACTION_FIELD"
                v-model:immediate="actionArr[index].IMMEDIATE"
                v-model:actionTitle="actionArr[index].ACTION_TITLE"
                @remove="() => actionArr.splice(index, 1)"

            />
            <p>{{ actionArr }}</p>
            <Button @click="addAction">{{ $t('add_action') }}</Button>

        </div>
        <Button>{{ $t("save") }}</Button>
    </form>
</template>

<script setup>
    /*
        PROPS
    */

        const props = useRoute().params


    /*
        IMPORTS    
    */
        const { ALIGNMENT: alignmentList, AURA: auraList, WIN_CONDITION, CATEGORY: categoryList, ACTION: actionList} = useDropdowns()
        const { subscribeCollection, getDocument, updateDocument,subscribeDocument, getCollection } = useFirestore()

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
        // if(process.server && props.roleID){
        //     roleDoc.value = await useFetch('../api/roles/' + props.roleID)
        //     console.log(roleDoc.value);
        // }
        
        watchEffect(() => {
            if(roleDoc.data){
                //TODO: populate all of the fields of roleInfo with data from firebase

            }
        })

        onMounted(async () => {
            console.log('roleID', props.id	);
            if(props.id){
                try{
                    roleDoc.value = subscribeDocument('roles', props.id)
                    console.log(roleDoc.value);
                    roleInfo.ACTIONS = subscribeCollection('roles', props.id, 'actions')
                    console.log(roleInfo.ACTIONS);

                }catch(err){
                    console.log(err);
                }
            }
            else{
                console.log('no roleID');
            }
            // getCollection("roles", props.roleID,'actions').then(val => //async call to get the actions from the database
            //     {
            //         console.log('val from getCollection', val);

            //         for (let action of val) {
            //             let actionCopy1 = JSON.parse(JSON.stringify(action));
            //             actionArr.value.push(actionCopy1);
                        
            //             let actionCopy2 = JSON.parse(JSON.stringify(action));
            //             roleInfo.ACTIONS.push(actionCopy2);
            //         }
            //     }
                
            // )
            // Create a deep copy of the original action list



            // if(props.roleID){
            //     roleDoc.value = subscribeDocument('roles', props.roleID)
            // }
        })

        const addAction = () => {
            actionArr.value.push({...action})
        }

        const processForm = async () => {
            //figure out which actions have changed and update those, delete the ones that are missing and add the new ones
        }

</script>
