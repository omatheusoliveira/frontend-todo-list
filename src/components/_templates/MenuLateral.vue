<template>
    <v-navigation-drawer
        :value="value"
        @input="$emit('input', $event)"
        fixed
        temporary
    >
        <v-list
            class="pt-0"
            dense
        >
            <div v-for="menu in menus" :key="menu.titulo">
                <v-list-item
                    v-if="menu.url"
                    :to="menu.url"
                    :exact="menu.exact"
                    @click.stop="$emit('input', false)"
                >
                    <v-list-item-icon>
                        <v-icon>{{ menu.icone }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ menu.titulo }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                    v-else-if="menu.titulo"
                >
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>{{ menu.icone }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ menu.titulo }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <div v-for="item in menu.itens" :key="item.titulo">
                        <v-list-item
                            v-if="item.url"
                            :to="item.url"
                            :exact="item.exact"
                            @click.stop="$emit('input', false)"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icone }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </div>
                </v-list-group>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'MenuLateral',
    props: {
        value: Boolean,
    },
    data () {
        return {
            menus: [
                {
                    icone: 'fa fa-user',
                    titulo: 'Usuários',
                    itens: [
                        {
                            icone: 'fa fa-list',
                            titulo: 'Listagem/Edição dos Usuários',
                            url: '/list-user'
                        },
                        {
                            icone: 'fa fa-file-lines',
                            titulo: 'Cadastro de Usuários',
                            url: '/register-user'
                        },
                    ]
                },
                {
                    icone: 'fa fa-paste',
                    titulo: 'Tarefas',
                    itens: [
                        {
                            icone: 'fa fa-list',
                            titulo: 'Listagem/Edição de Tarefas',
                            url: '/list-task'
                        },
                        {
                            icone: 'fa fa-file-lines',
                            titulo: 'Cadastro de Tarefa ',
                            url: '/register-task'
                        },
                    ]
                },
                
            ],
        }
    },
    watch: {
        'value' : function (val) {
            if (val) {
                this.$el.querySelector(".v-navigation-drawer__content").scrollTop = 0
            }
        },
    },
}
</script>

<style>
    .v-navigation-drawer__content {
        margin-bottom: 10px !important;
    }
    .v-list-group__header > .v-list-item {
        padding: 0 !important;
    }
    .v-list-group__header__append-icon > i {
        font-size: 12px !important;
    }
    .v-list-group__items {
        background: rgba(255, 255, 255, 0.9) !important;
    }
    .v-list-item--active {
        background: #1e88e5 !important;
        color: #72777a !important;
    }
    .v-list-item--active .v-list-item__icon {
        color: #f8f8ff !important;
    }
    .v-list-item--active .v-list-item__title {
        color: #f8f8ff !important;
    }
    .v-navigation-drawer {
        background: #e9ecef !important;
    }
    .v-list-item {
        color: #72777a !important;
    }
    .v-list-item__icon {
       height: 24px !important;
       width: 24px !important;
    }
</style>