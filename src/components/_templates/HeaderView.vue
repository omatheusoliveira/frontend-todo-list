<template>
    <v-app-bar
        app
        fixed
        color="#1e88e5"
        dark
    >
        <v-app-bar-nav-icon
            @click.stop="$emit('drawer', !show)"
        ></v-app-bar-nav-icon>
        <v-toolbar-title @click="toHome()" style="cursor: pointer"
        >
        Todo List 
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>

export default {
    name: 'HeaderView',
    props: {
        show: Boolean,
    },
    model: {
        prop: 'show',
        event: 'drawer',
    },

    methods: {
        toHome(){
            this.$router.push({path: '/'});
        }
    }
}
</script>

<style>
    .v-toolbar__content i, .v-toolbar__title a {
        font-size: .875rem !important;
    }
    .v-toolbar__title a {
        color: #FFF !important;
        text-decoration: none !important;
    }
</style>