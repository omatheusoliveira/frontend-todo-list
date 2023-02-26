<template>
    <div>
        <HeaderView
            v-model="show"
        />
        <MenuLateral
            v-model="show"
        />
        <v-container
            fluid
        >
            <v-flex
                xs12
            >
                <slot />
            </v-flex>
        </v-container>
    </div>
</template>

<script>
import HeaderView from '@/components/_templates/HeaderView'
import MenuLateral from '@/components/_templates/MenuLateral'

export default {
    name: 'TemplateView',
    components: {
        HeaderView,
        MenuLateral,
    },
    data () {
        return {
            show: false
        }
    }
}
</script>