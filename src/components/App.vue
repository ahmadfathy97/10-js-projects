<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Label text="Jokes" width="80%" fontSize="24" verticalAlignment="left" />
        <Label text="👨" width="20%" fontSize="24" textAlign="right" verticalAlignment="right" @tap="goToAbout()" />
      </StackLayout>
    </ActionBar>
    <StackLayout>
      <Image src="res://logo" width="120" height="180" style="margin: 50px auto" />
      <ListView for="(type, i) in jokesTypes">
        <v-template>
          <FlexboxLayout flexDirection="row">
            <Label style="width: 100%" :background="colors[i]" class="item" alignSelf="center" :text="type" @tap="gotToJokeType(type)" />
          </FlexboxLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script >
import Jokes from './jokes.vue'
import About from './About.vue'
  export default {
    data() {
      return {
        jokesTypes: ["Programming", "Dark", "Misc", "Pun", "Spooky", "Christmas"],
        colors: ["#6C63FF", "#0099ff", "#ff80aa", "#751aff", "#d99744", "#0800ff"]
      }
    },
    methods:{
      gotToJokeType(type){
        this.$navigateTo(Jokes, { props: { type: type }});
      },
      goToAbout(){
        this.$navigateTo(About)
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #6C63FF;
    color: #f8f8f8;
  }
  ActionBar Label{
    color: #f8f8f8;
  }
  ListView {
    width: 90%;
    max-width: 600px;
    margin: auto;
  }
  .item{
    position: relative;
    display: block;
    font-size: 20px;
    padding: 10px;
    margin: 10px auto;
    text-align: center;
    background: #6C63FF;
    width: 90%;
    color: #ddd
  }
  .logo{
    display: block;
    margin: 10px auto;
  }

</style>
