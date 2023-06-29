<template>
    <div class="container">
      <header>{{ header}}</header>
  
        <form @submit.prevent>    

            <div class="upload">
                <!-- <label>Upload role icon</label> -->
                <input type="file" @change="handleChange" required>
            </div>
            <p class="success" v-if="!hasValue && wasUploaded">Icon was successfully uploaded!</p>
            <div class="buttons" @click="handleSubmit">
                <button class="btn" v-if="!isPending">Upload</button>
                <button class="btn" v-else>Saving...</button>
            </div>
        </form>
        <button @click="handleDelete">Delete an icon</button>
        <div v-for="item in icons" :key="item.fileName" @click="handleDelete(item.fileName)">
            <p>{{ item.originalName }}</p>
            <img :src="item.imageUrl" >
        </div>
    </div>
</template>

<script setup>
    /*
        PROPS
    */
        defineProps({
            header: String,

        })
    /*
        IMPORTS
    */
        import useIconStorage from '@/composables/useIconStorage' //did not auto import
        import useFirestore from '@/composables/useFirestore.ts'
        const { uploadImage, deleteImage } = useIconStorage()
        const { subscribeCollection } = useFirestore()

    /*
        VARIABLES
    */
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        const wasUploaded = ref(false)
        const hasValue = ref(false)



    /*
        
    */
        const icons = await subscribeCollection('playerIcon')
    /*
        HANDLERS
    */
        // allowed file types
        const types = ['image/png', 'image/jpeg', 'image/jpg']
    
        const handleChange = (e) => { //when an event has been fired, the event object is passed in
            const selected = e.target.files[0]
            console.log(selected);
            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            } else{
                file.value = null
                fileError.value = 'Please select an image file (png or jpg or jpeg)'
            }

        }
        

        const handleSubmit = async () => {
            if(file.value){
                isPending.value = true
                hasValue.value = true
                wasUploaded.value = false
                try{
                    await uploadImage('playerIcon', file.value)
                } catch(err) {
                    console.log(err.message)
                    fileError.value = err.message
                    isPending.value = false
                }

                isPending.value = false

                if(!fileError.value){
                    hasValue.value = false
                    wasUploaded.value = true
                    file.value = null
                    fileError.value = null  
                }
            } else{
                fileError.value = 'Please select an image file (png or jpg or jpeg)'
            }
        }

        const handleDelete = (uid) => {
            deleteImage('playerIcon', uid)
        }

</script>
