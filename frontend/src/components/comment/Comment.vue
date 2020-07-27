<template>
    <v-container>
        <v-card>
            <v-img></v-img>
            <v-card-text>{{ user.name }} <span class="date">{{ comment.time }}</span></v-card-text>
            <v-card-text>{{ comment.content }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    
    data () {
        return {
            comment: {},
            user: {}
        }
    },

    /*computed:  {
        avatar () {
            return 'https://api.adorable.io/avatars/48/' + this.comment.name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-')  + '@adorable.io.png'
        }
    }*/
}
</script>