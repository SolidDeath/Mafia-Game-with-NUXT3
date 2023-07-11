<template>
    <div class="action-row">
        <img :src="iconUrl" alt="Action Icon" class="action-icon" v-if="iconUrl" />
        <Dropdown :options="ACTION" @update:current-value="value => $emit('update:actionTitle', value)"/>
        <FormGroup :label="$t('role_action_immediate')" @update:modelValue=" val => $emit('update:immediate', !props.immediate)" type="checkbox" :value="props.immediate"/>
        <FormGroup :label="$t('role_action_immediateActionField')" @update:modelValue=" val => $emit('update:immediateActionField', val )" type="text" :value="props.immediateActionField" v-if="props.immediate == true"/>
        <FormGroup :label="$t('role_action_isNightAction')" @update:modelValue=" val => $emit('update:isNightAction', !props.isNightAction)" type="checkbox" :value="props.isNightAction"/>
        <UploadIcon @update:iconUrl=" val => $emit('update:iconUrl', val)" header="Action icon" collection="actionIcons"/>
        <Button class="material_icons" @click="$emit('remove')">minus</Button>
    
    </div>
  </template>
  
  <script setup>
  /*
    PROPS
  */
    const props = defineProps({   
        actionTitle: {  
            type: String,
            default: ''
        },
        iconUrl: {
            type: String,
            default: ''
        },
        isNightAction: {
            type: Boolean,
            default: true
        },
        immediate: {
            type: Boolean,
            default: false
        },
        immediateActionField: {
            type: String,
            default: ''
        }
    })
    const { ACTION } = useDropdowns()
  
    watchEffect(() => {
      console.log(props.actionTitle);
      console.log(props.isNightAction);
      console.log(props.immediate);
      console.log(props.immediateActionField);

    })

    defineEmits([
        'update:actionTitle',
        'update:iconUrl',
        'update:isNightAction',
        'update:immediate',
        'update:immediateActionField',
        'remove'
    ])
  </script>
  
  <style scoped>
  .action-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .action-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .action-title, .action-night, .action-immediate {
    margin-right: 10px;
  }
  </style>
  