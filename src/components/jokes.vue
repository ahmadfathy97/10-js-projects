<template>
  <Page>
    <ActionBar :title="type">
      <NavigationButton text="<" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
    </ActionBar>
    <ScrollView>
      <Label v-if="err" text="something went wrong 😢" />
      <Label v-if="!loaded" style="font-size:40px margin: 40px auto" text="Loading..." />
      <ListView v-if="!err" for="joke in jokes">
        <v-template>
          <FlexboxLayout flexDirection="row">
            <TextView editable="false" :text="joke.text" style="width: 100%" class="item" alignSelf="center" />
          </FlexboxLayout>
        </v-template>
      </ListView>
    </ScrollView>
  </Page>
</template>
<script>
// import * as https from "https";
export default {
  data(){
    return{
      jokes: [],
      err: '',
      loaded: false
    }
  },
  props: ['type'],
  mounted(){
    console.log(this.type);
    // https.getJSON(`https://sv443.net/jokeapi/v2/joke/Programming?type=twopart&amount=15`)
    // .then(jokes => {
    //   this.jokes = jokes.jokes;
    //   console.log(jokes);
    // }, err => {
    //   this.err = err;
    // });

    fetch(`https://sv443.net/jokeapi/v2/joke/${this.type}?type=twopart&amount=50`,
    {
      method: 'GET',
      headers:{
        'Content-type': 'application/json'
      }
    })
    .then(res=> res.json())
    .then((jokes)=>{
      this.jokes = jokes.jokes.map(joke=> { return {id: joke.id, text: joke.setup + ' ' + joke.delivery}})
      this.loaded = true
    }).catch(err =>{
      this.err = err
    })
  }
}
</script>
<style scoped>
  ActionBar {
    background-color: #6C63FF;
    color: #f8f8f8;
  }
  .item{
    font-size: 20px;
  }
</style>
