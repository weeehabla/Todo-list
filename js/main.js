$(document).ready(function() {
	var listCollec = [];
	// $('body').on('click','#create-list-btn',)

	$('#create-list-btn').on('click', function(){
		// Update later make sure that no list exist
		// with same name;

		var listName = $('#create-list-input').val();
		var list = List(listName); 

		listCollec.push(list);
		$('#create-list-input').val('');

		console.log(listCollec);
		updateList();
	});

	function updateList(){
		//list-select
		var list = $('#list-select');
		list.html('');

		for(var i of listCollec){
			var option = '<option>' + i.name + '</option>';
			list.append(option);
		}

		list.hide().fadeIn();
	}

	// Handle create task
	$('body').on('click', '#create-task-btn', function() {
		saveTask();
		updateDom();
	});

	function saveTask() {
		var list = $('#list-select');
		var listName = list.val();
		var index = listCollec.findIndex(function(list) {
			return listName === list.name;	
 		});
		console.log(index)
		if(index >= 0){
			var content = $("#create-task-input").val();
			var task = Task(content);
			listCollec[index].addTask(task);
		}else{
			console.warn('List not found');
		}
	}

	function updateDom() {
		
		for(var list of listCollec) {
			// var row = $("<div class='row'>");
			// var col = $("<div class='col'>");
			// col.append
			var html = `<div class="row">
			<div class="col">
				<h4>${list.name}</h4>`
				for(var task of list.task) {
					
					html +=`<div class="task-wrap">
					<div class="row">
						<div class="col">
							<span>${task.content}</span>
						</div>
						<div class="col">
							<button>Complete</button>
							<small>Date</small>
						</div>
					</div>
				</div>`

				}
				
			html +=`
			</div>
		</div>	`
		$("#show").html(html)


		}



	}
});

	