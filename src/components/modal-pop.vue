<template>
<!-- <button class="btn btn-sm" data-toggle="modal" :data-target="'#'+modal_id">button</button> -->
<div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
      <slot name="body"></slot>
		</div>
		<!-- accordion end -->
		<div class="modal-footer">
		<slot name="save"></slot>
	     	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
     	</div>
      </div>    
    </div>
  </div>
</template>
<script >
export default{
	data(){
		let timeNow=new Date().getTime();
		return{
			// :"modal"+timeNow
		};
	},
	props:["modalTitle","modal_id"]
}
	
</script>