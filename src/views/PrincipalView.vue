<template>
    <VTemplate>
        <router-view></router-view>
    </VTemplate>
</template>

<script>
import VTemplate from '@/components/TemplateView'

export default {
    name: 'PrincipalView',
    components: {
        VTemplate
    }
}
</script>