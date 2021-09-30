<template>
    <div id="nav">
        <router-link :to="$i18nRoute({ name: 'Home' })">{{
            $t('MENU.HOME')
        }}</router-link>
        <router-link :to="$i18nRoute({ name: 'About' })">{{
            $t('MENU.ABOUT')
        }}</router-link>
    </div>
</template>
