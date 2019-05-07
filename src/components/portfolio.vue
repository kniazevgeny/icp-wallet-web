<template>
    <transition name="fade">
        <div class="portfolio">
            <v-layout row right>
                <v-dialog v-model="log" persistent max-width="500px">
                    <v-btn slot="activator" color="primary" dark>Войти</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Вход</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Email" type="email" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Пароль" type="password" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="log = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="log = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="reg" persistent max-width="500px">
                    <v-btn slot="activator" color="primary" dark>Регистрация</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Регистрация</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Имя" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Фамилия" required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Email" type="email" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Пароль" type="password" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-select
                                                :items="['0-17', '18-29', '30-54', '54+']"
                                                label="Age"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-select
                                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                                label="Interests"
                                                multiple
                                                autocomplete
                                                chips
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="reg = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="reg = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'portfolio',
        data: () => ({
            log: false,
            reg: false
    })
    }
</script>
<!-- инкапсулированные стили компонента -->
<style scoped>
    #portfolio {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>