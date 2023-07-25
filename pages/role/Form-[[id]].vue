<template>
    <p>{{ roleDoc }}</p>
    <form v-bind="$attrs" @submit.prevent="processForm" >
        <FormGroup :label="$t('role_name')" v-model="roleName" type="text"/>
        <FormGroup :label="$t('role_description')" v-model="roleDescription" type="text"/>

        <div>
            <label for="role_aura">{{ $t('role_aura') }}</label>
            <Dropdown name="role_aura" :options="auraList"  v-model="auraReactive"/>
        </div>
        <div>
            <label for="role_alignment">{{ $t('role_alignment') }}</label>
            <Dropdown :options="alignmentList"  v-model="alignment" name="role_alignment"/>
        </div>
        <div>
            <label for="role_category">{{ $t('role_category') }}</label>
            <Dropdown :options="categoryList"  v-model="category" name="role_category"/>
        </div>
        <div>
            <label for="role_winCondition">{{ $t('role_winCondition') }}</label>
            <Dropdown :options="WIN_CONDITION"  v-model="winCondition" name="role_winCondition"/>
        </div>

        <FormGroup :label="$t('can_be_killed_by_mafia')" v-model="canBeKilledByMafia" type="checkbox"/>
        <FormGroup :label="$t('can_be_multiple')" v-model="canBeMultiple" type="checkbox"/>
        
    
        <div>
            <label for="investigation_responses">{{ $t('investigation_responses') }}</label>
            <div name="investigation_responses">
                <div>
                    <label for="investigation_res_aura">{{ $t('investigation_res_aura') }}</label>
                    <Dropdown :options="auraList"  v-model="investigationResAura" name="investigation_res_aura"/>
                </div>
                <div>
                    <label for="investigation_res_alignment">{{ $t('investigation_res_alignment') }}</label>
                    <Dropdown :options="alignmentList"  v-model="investigationResAlignment" name="investigation_res_alignment"/> 
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
    /*
        GLOBAL VARIABLES
    */
        
        
        const immutableActions = ref([])
        const actionArr = ref([])
        let roleDoc = ref<RoleDocType | null>(null)
        // if(process.server){
        //     let roleDoc = await useFetch("../api/firestore/roles/" + props.id)
        //     console.log("Roledoc: ",roleDoc);
            
        // }
    
        let serverRole = await useFetch("../api/firestore/roles/" + props.id)
        console.log('ServerRole', serverRole);
        
        const action = {
            ACTION_TITLE: '',
            ICON_URL: '',
            IS_NIGHT_ACTION: true,
            IMMEDIATE: false,
            IMMEDIATE_ACTION_FIELD: '' //The field that is toggled if the action is immediate
        }
        
    
    /*
        DATA USING SERVER API
    */

    // const roleValues = ref({
    //     ROLE_NAME = roleDoc.value.ROLE_NAME,
    //     ROLE_DESCRIPTION: string,
    //     AURA: string,
    //     ALIGNMENT: string,
    //     CATEGORY: string,
    //     WIN_CONDITION: string,
    //     HAS_NIGHT_ACTION: boolean,
    //     HAS_DAY_ACTION: boolean,
    //     CAN_BE_KILLED_BY_MAFIA: boolean,
    //     CAN_BE_MULTIPLE: boolean,
    //     INVESTIGATION_RES: {
    //         AURA: string,
    //         ALIGNMENT: string,
    //     },
    //     ICON_URL: string,
    // })
        watchEffect(() => {
            console.log("Roledoc.value: ", serverRole.value);
            
        })
   
    /*
        COMPUTED PROPERTIES
    */
        const roleName = computed({
           get: () => roleDoc.value?.ROLE_NAME,
           set: (val) => { if(roleDoc.value) roleDoc.value.ROLE_NAME = val }
        });

        const roleDescription = computed({
            get: () => roleDoc.value?.ROLE_DESCRIPTION,
            set: (val) => { if(roleDoc.value) roleDoc.value.ROLE_DESCRIPTION = val }
        });

        const auraReactive = computed({
            get: () => roleDoc.value?.AURA,
            set: (val) => {
                roleDoc.value.AURA = val
                console.log(roleDoc.value.AURA);
            } 
        });

        const alignment = computed({
            get: () => roleDoc.value?.ALIGNMENT,
            set: (val) => { if(roleDoc.value) roleDoc.value.ALIGNMENT = val }
        });

        const category = computed({
            get: () => roleDoc.value?.CATEGORY,
            set: (val) => { if(roleDoc.value) roleDoc.value.CATEGORY = val }
        });

        const winCondition = computed({
            get: () => roleDoc.value?.WIN_CONDITION,
            set: (val) => { if(roleDoc.value) roleDoc.value.WIN_CONDITION = val }
        });

        const hasNightAction = computed({
            get: () => roleDoc.value?.HAS_NIGHT_ACTION,
            set: (val) => { if(roleDoc.value) roleDoc.value.HAS_NIGHT_ACTION = val }
        });

        const hasDayAction = computed({
            get: () => roleDoc.value?.HAS_DAY_ACTION,
            set: (val) => { if(roleDoc.value) roleDoc.value.HAS_DAY_ACTION = val }
        });

        const canBeKilledByMafia = computed({
            get: () => roleDoc.value?.CAN_BE_KILLED_BY_MAFIA,
            set: (val) => { if(roleDoc.value) roleDoc.value.CAN_BE_KILLED_BY_MAFIA = val }
        });

        const canBeMultiple = computed({
            get: () => roleDoc.value?.CAN_BE_MULTIPLE,
            set: (val) => { if(roleDoc.value) roleDoc.value.CAN_BE_MULTIPLE = val }
        });

        const investigationResAura = computed({
            get: () => roleDoc.value?.INVESTIGATION_RES?.AURA,
            set: (val) => { if(roleDoc.value?.INVESTIGATION_RES) roleDoc.value.INVESTIGATION_RES.AURA = val }
        });

        const investigationResAlignment = computed({
            get: () => roleDoc.value?.INVESTIGATION_RES?.ALIGNMENT,
            set: (val) => { if(roleDoc.value?.INVESTIGATION_RES) roleDoc.value.INVESTIGATION_RES.ALIGNMENT = val }
        });

        const iconURL = computed({
            get: () => roleDoc.value?.ICON_URL,
            set: (val) => { if(roleDoc.value) roleDoc.value.ICON_URL = val }
        });

        watchEffect(() => {
            // console.log(roleName);
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
            // roleDoc.value.HAS_NIGHT_ACTION = computed(() => {
            //     let res = actionArr.value.filter(obj => obj.IS_NIGHT_ACTION === true).length > 0 ? true : false;
            //     console.log(res);
                
            //     return res
            // }).value

            // roleDoc.value.HAS_DAY_ACTION = computed(() => {
            //     return actionArr.value.filter(obj => obj.IS_NIGHT_ACTION === false).length > 0 ? true : false;
            // }).value
    /*
        SSR
    */




        onMounted(async () => {
            console.log('roleID', props.id	);
            if(props.id){
                try{
                    
                    // roleDoc.ACTIONS = await subscribeCollection('roles', props.id, 'actions')
                    
                    // console.log(roleDoc.ACTIONS);



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
            //             roleDoc.ACTIONS.push(actionCopy2);
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
            // await addDocument('roles', roleDoc)
            //figure out which actions have changed and update those, delete the ones that are missing and add the new ones
        }

</script>

