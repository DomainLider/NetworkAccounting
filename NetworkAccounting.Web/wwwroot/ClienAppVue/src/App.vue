<template>
    <div id="app">
        <!--<div id="nav">-->
            <!--<router-link to="/">Home</router-link>-->
            <!--|-->
            <!--<router-link to="/about">About</router-link>-->
            <!--<router-link to="/dashboard">Dashboard</router-link>-->
        <!--</div>-->
        <router-view/>
    </div>
</template>

<style lang="scss">
    html, body {
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background: linear-gradient(to right, rgba(28,98,192,0.4), rgba(28, 98, 192, 0.5)), url(./assets/background/ms1.png) repeat ;
        height: 100%;
    }

    #nav {
        padding: 5px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
