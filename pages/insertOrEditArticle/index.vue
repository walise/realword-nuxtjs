<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form >
          <fieldset>
            <fieldset class="form-group">
                <input type="text" 
                       class="form-control form-control-lg" 
                       required
                       v-model="article.title"
                       placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" 
                       class="form-control" 
                       v-model="article.description"
                       placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" 
                          rows="8" 
                          required
                          v-model="article.body"
                          placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" 
                       class="form-control" 
                       v-model="article.tagList"
                       placeholder="Enter tags separate with ,"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" 
                    type="button"
                    @click="handler"
                    >
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>



</template>

<script>
import { createArticle } from '@/api/article'
export default {
    middleware: 'auth', 
    name: 'insertOrEditArticlePage',
    data: function () {
      return {
        article: {
          title: '',
          description: '',
          body: '',
          tagList: ''
        }
      }
    },
    methods: {
      async handler () {
        let data = this.article;
        data.tagList = typeof this.article.tagList === 'string'?this.article.tagList.split(','):data.tagList;
        try{
          await createArticle(data);
          this.$router.push({
            name:'home'
          })
        }catch(err){
          alert(err)
        }
      }
    }
}
</script>

<style>

</style>