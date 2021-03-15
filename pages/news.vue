<template>
    <div>
        <v-container>
            <v-flex xs12 pb-5>
            <h2>News</h2>
                
            </v-flex>
            <v-flex xs12 pb-3 sm6 offset-sm3 v-for="(article,index) in articles" :key="index">
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                    <img :src="article.urlToImage" width="100%" height="200px"/>

                    <v-card-title>
                        <div>
                            <div class="headline">{{article.title}}</div>
                        </div>
                    </v-card-title>
                    
                    <v-card-text>
                    {{article.content}}
                    </v-card-text>

                    <v-card-actions>
                        <v-btn :href="article.url" target="_blank">Open</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-container>
    </div>
</template>
<script>
export default {
    async asyncData({app}){
        const articles = await app.$axios.$get('http://newsapi.org/v2/everything?q=tesla&from=2021-02-15&sortBy=publishedAt&apiKey=635994b10d404582847afd9550655c1c');
        return articles;
    }
}
</script>