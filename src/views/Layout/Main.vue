<template>
	<el-row>
	  
	  <el-row :gutter="20" class="mx20">
		  <el-col :span="6" v-for="o in 4" :key="o"><el-card :body-style="{ padding: '0px' }">
				<div style="padding: 14px;">
					<span>{{'标题 ' + o }}</span>
					<div class="bottom clearfix">
					  <el-button type="text" class="button" :id="o" @click="alert(o)">操作按钮</el-button>
					</div> 
				</div>
				</el-card>
			</el-col>
		</el-row>
		
	  <el-col>
		<el-card class="box-card">
		  <div v-for="o in 4" :key="o" class="text item">
			{{'列表内容 ' + o }}
		  </div>
		</el-card>
	  </el-col>
	  
	</el-row>
</template>

<script>
	export default {
	  data() {
		return {
		  
		};
	  },
	  methods: {
		alert(id){
			alert(id);
		}
	  }
	}
</script>

<style>
.mx20 {
    margin: 20px 0;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>