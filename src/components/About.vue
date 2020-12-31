<template>
  <Page>
    <ActionBar title="About">
      <NavigationButton text="<" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
    </ActionBar>
    <StackLayout>
      <TextView class="text" editable="false" text="My name is Ahmad Fathy and this project is the 10th project of 10-js-projects I made using some js frameworks and libraries as I could... ☺ " />
      <TextView class="text link" text="https://github.com/ahmadfathy97/10-js-projects" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
}
</script>

<style scoped>
ActionBar {
  background-color: #6C63FF;
  color: #f8f8f8;
}
.text{
  font-size: 22px;
  margin: 20px 5px;
  padding: 5px;
}
.link{
  color: #0080ff;
}
</style>
