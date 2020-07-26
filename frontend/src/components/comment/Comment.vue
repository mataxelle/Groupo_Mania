<template>
    <v-container>
        <v-card>
            <v-img :src="avatar" alt=""></v-img>
            <v-card-text>{{ comment.user.name}} <span class="date">{{ comment.time }}</span></v-card-text>
            <v-card-text>{{ comment.content}}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    
    props: ['comment'],

    computed:  {
        avatar () {
            return 'https://api.adorable.io/avatars/48/' + this.comment.name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-')  + '@adorable.io.png'
        }
    }
}
</script>