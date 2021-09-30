<template>
    <div class="home">
        <p>{{ $t('MAIN.WELCOME', { company: 'Surampak' }) }}</p>
        <p>{{ $d(new Date(), 'short') }}</p>
        <p>{{ $n(100, 'currency') }}</p>
    </div>
</template>
