<template>
    <p>{{ roleDoc }}</p>
    <form v-bind="$attrs" @submit.prevent="processForm" v-if="roleExists">
        <FormGroup :label="$t('role_name')" v-model="roleDoc.ROLE_NAME" type="text"/>
        <FormGroup :label="$t('role_description')" v-model="roleDoc.ROLE_DESCRIPTION" type="text"/>

        <div>
            <label for="role_aura">{{ $t('role_aura') }}</label>
            <Dropdown name="role_aura" :options="auraList"  v-model="roleDoc.AURA"/>
        </div>
        <div>
            <label for="role_alignment">{{ $t('role_alignment') }}</label>
            <Dropdown :options="alignmentList"  v-model="roleDoc.ALIGNMENT" name="role_alignment"/>
        </div>
        <div>
            <label for="role_category">{{ $t('role_category') }}</label>
            <Dropdown :options="categoryList"  v-model="roleDoc.CATEGORY" name="role_category"/>
        </div>
        <div>
            <label for="role_winCondition">{{ $t('role_winCondition') }}</label>
            <Dropdown :options="WIN_CONDITION"  v-model="roleDoc.WIN_CONDITION" name="role_winCondition"/>
        </div>

        <FormGroup :label="$t('can_be_killed_by_mafia')" v-model="roleDoc.CAN_BE_KILLED_BY_MAFIA" type="checkbox"/>
        <FormGroup :label="$t('can_be_multiple')" v-model="roleDoc.CAN_BE_MULTIPLE" type="checkbox"/>
        
    
        <div>
            <label for="investigation_responses">{{ $t('investigation_responses') }}</label>
            <div name="investigation_responses">
                <div>
                    <label for="investigation_res_aura">{{ $t('investigation_res_aura') }}</label>
                    <Dropdown :options="auraList"  v-model="roleDoc.INVESTIGATION_RES.AURA" name="investigation_res_aura"/>
                </div>
                <div>
                    <label for="investigation_res_alignment">{{ $t('investigation_res_alignment') }}</label>
                    <Dropdown :options="alignmentList"  v-model="roleDoc.INVESTIGATION_RES.ALIGNMENT" name="investigation_res_alignment"/> 
                </div>
            </div>  
        </div>

        
        <!-- ACTIONS -->
        <div class="actions">
          <RoleAction
            v-for="(action, index) in actionArr" 
                :key="index"

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

    <!-- ERROR -->


</template>

<script setup lang="ts">

    /*
        PROPS
    */
        const props = useRoute().params
        console.log("Props: ", props.id);
        
   
    /*
        IMPORTS    
    */
        const { ALIGNMENT: alignmentList, AURA: auraList, WIN_CONDITION, CATEGORY: categoryList, ACTION: actionList} = useDropdowns()
        const { subscribeCollection, getDocument, updateDocument,subscribeDocument, getCollection, addDocument } = useFirestore()
  
  
    /*
        TYPES
    */
 
        interface RoleDocType {
            ROLE_NAME: string;
            ROLE_DESCRIPTION: string;
            AURA: string;
            ALIGNMENT: string;
            CATEGORY: string;
            WIN_CONDITION: string;
            HAS_NIGHT_ACTION: boolean;
            HAS_DAY_ACTION: boolean;
            CAN_BE_KILLED_BY_MAFIA: boolean;
            CAN_BE_MULTIPLE: boolean;
            INVESTIGATION_RES: {
                AURA: string;
                ALIGNMENT: string;
            };
            ICON_URL: string;
        }

        interface ServerRoleType {
            status: number,
            reason: string,
            data: RoleDocType | null
        }
        interface ActionType {
            ACTION_TITLE: string,
            ICON_URL: string,
            IS_NIGHT_ACTION: boolean,
            IMMEDIATE: boolean,
            IMMEDIATE_ACTION_FIELD: boolean
        }
    /*
        GLOBAL VARIABLES
    */
        
        const roleExists = computed(() => {
            if(serverRole.data !== null){
                return true
            }
            else return false
        })
        const immutableActions = ref([])
        const actionArr: Ref<Array<ActionType>> = ref([])

        let roleDoc = ref<RoleDocType>({
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
                ALIGNMENT: '',
            },
            ICON_URL: '',

        })

        const action = {
            ACTION_TITLE: '',
            ICON_URL: '',
            IS_NIGHT_ACTION: true,
            IMMEDIATE: false,
            IMMEDIATE_ACTION_FIELD: '' //The field that is toggled if the action is immediate
        }

    /*
        Getting values from the server 
    */
    

        const getServerRole = async () => {
            try{
                const roleData = await useFetch("/api/firestore/roles/" + props.id)
                if(roleData.data){
                    return{
                        status: 200,
                        data: roleData.data.value as RoleDocType,
                        reason: "Success!"
                    }
                } else {
                    return {
                        reason: "Data not found",
                        data: null,
                        status: 404
                    }
                }
            } catch (err) {
                return {
                    status: 401,
                    data: null,
                    reason: "Role does not exist"
                }
            }
        }

        const assignValues = () => {
            if(serverRole.data !== null){
                const serverRoleKeys = Object.keys(serverRole.data)
                console.log(serverRoleKeys);
                serverRoleKeys.forEach(key => {
                    if (key in roleDoc.value) {
                        roleDoc.value[key] = serverRole.data[key];
                    }
                    else if (key != "id"){
                        console.error("Error: " + key + " does not exist");
                    }
                })
                console.log(roleDoc.value);
                
            }
        }


        const serverRole: ServerRoleType = await getServerRole()
        assignValues()


        console.log("Roledoc value 193", roleDoc.value);

        console.log(roleDoc.value.ROLE_NAME);
        
        
        
        
        let serverActions = await useFetch('/api/firestore/roles/' + props.id + "/actions")
        console.log('ServerActions',serverActions.data.value);
        
    
        // console.log(roleDoc)
        



        
    
   


        watchEffect(() => {
            console.log(roleDoc.value.ROLE_NAME);
            // console.log(canBeKilledByMafia);
            // console.log(aura);
            // console.log(alignment);
            // console.log(category);
            // console.log(winCondition);
            // console.log(hasNightAction);
            // console.log(hasDayAction);
            // console.log(canBeMultiple);
            // console.log(investigationResAura);
            // console.log(investigationResAlignment);
            // console.log(iconURL);

            
            
            
        })

    /*
        COMPUTED ROLE VALUES
    */
            roleDoc.value.HAS_NIGHT_ACTION = computed(() => {
                let res = actionArr.value.filter(obj => obj.IS_NIGHT_ACTION === true).length > 0 ? true : false;
                console.log(res);
                
                return res
            }).value

            roleDoc.value.HAS_DAY_ACTION = computed(() => {
                return actionArr.value.filter(obj => obj.IS_NIGHT_ACTION === false).length > 0 ? true : false;
            }).value
    /*
        SSR
    */




        onMounted(async () => {

        })

        const addAction = () => {
            actionArr.value.push({...action})
        }

        const processForm = async () => {
            // await addDocument('roles', roleDoc)
            //figure out which actions have changed and update those, delete the ones that are missing and add the new ones
        }

</script>

