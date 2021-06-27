<template>
  <div class="pagination">
      <ul class="pagination-nav">
          <!-- 总数量 -->
          <li class="total-text disable">共{{total}}条</li>
          <!-- 当页数大于5页才显示 上下页按钮 -->
          <li class="pagination-prev disable" v-if="pageCount > 5" @click="translate(-1)">上一页</li>
          <!-- 中间显示五条数据 -->
          <li class="pagination-item page-tab-item" :class="{
              active: activePage === page
          }" v-for="page in pages" :key="page">
             <nuxt-link
              class=""
              :to="{
                name: 'home',
                query: {
                  page: page,
                  tag: tag,
                  tab: tab
                }
              }"
              @click="changePage(page)"
            >{{ page }}</nuxt-link>
            <!-- <slot>{{page}}</slot> -->
          </li>
          <li class="pagination-next" v-if="pageCount > 5" @click="translate(1)">下一页</li>
          <!-- 页面快速跳转 -->
          <!-- <li class="pagination-jumper">
              <input type="number" name="jumpPage">
          </li> -->
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number
        },
        pageCount: {
            type: Number
        },
        limit: {
            type: Number,
            default: 5
        },
        offset: {
            type: Number,
            default: 0
        },
        activePage: {
            type: Number,
            default: 1
        },
        tab: {
            type: String,
            default: 'global_feed'
        },
        tag: {
            type: String
        }
    },
    data: function () {
        return {
            pages: [],
            curPage: this.offset,
        }
    },
    computed: {
        // 页码有几页
        pageTabCount(){
            return Math.ceil(this.pageCount / this.limit)
        }
    },
    created(){
        this.getPages(this.curPage * this.limit,(this.curPage+1)*this.limit)
    },
    methods: {
        getPages (from,to) {
            // 显示当前 页码数据
            // 默认 显示前五条
            // 0*5~5*1
            // 1*5~5*2
            // 2*5~5*3
            this.pages = [];
            for(let i = 0; i < this.pageCount;i++){
                if(from <= i &&  i < to){
                    this.pages.push(i+1)
                }
            }
        },
        translate(type){
             this.curPage = this.curPage + type;
             if(this.curPage >= this.pageTabCount-1){
                    this.curPage = this.pageTabCount-1;
             }else if(this.curPage < 0 ){
                    this.curPage = 0;
             }
             this.getPages(this.curPage * this.limit,(this.curPage+1)*this.limit)
        },
        changePage(page){
            this.activePage = page;
        }
    }
}
</script>

<style>
    .pagination{
        width: 100%;
        font-size: 14px;
    }
    .pagination-nav{
        position: relative;
        list-style-type: none;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .pagination-nav li{
        cursor: pointer;
        margin-left: 10px;
    }
    .page-tab-item{
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #bbb;
        color: #aaa;
        margin-left: 8px;
        border-radius: 4px;
        
    }
    .disbale{
        color: #aaa !important;
    }
    .page-tab-item:hover{
        border: 1px solid #5cb85c;
        color: #5cb85c;
    }
    .page-tab-item.active{
        background-color: #5cb85c;
        font-weight: 600;
        border: 1px solid #5cb85c;
    }
    .pagination-nav .active a{
        color: #fff !important;
    }
    .pagination-jumper input{
        display: block;
        width: 50px;
        height: 38px;
        margin-left: 10px;
        border: 1px solid #666;
        color: #666;
        border-radius: 4px;
    }
</style>