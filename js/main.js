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

	// Handel Delete Task 
	$("body").on("click", '.task-remove-btn', function() {
		var src = $(this);
		var listId = parseInt(src.attr('data-list-id'));
		var taskId = parseInt(src.attr('data-task-id'));

		removeTask(listId, taskId);
		updateDom();
	});
	// Handle Compelte Task.

	$("body").on("click", ".task-complete-btn", function() {
		var src = $(this);
		var listId = parseInt(src.attr('data-list-id'));
		var taskId = parseInt(src.attr('data-task-id'));
		completeTask(listId, taskId);
		updateDom();


	})



	function saveTask() {
		var list = $('#list-select');
		var listName = list.val();
		var index = listCollec.findIndex(function(list) {
			return listName === list.name;	
 		});
		console.log(index)
		if(index >= 0){
			var input = $("#create-task-input");
			var content = input.val();
			input.val("");
			var task = Task(content);
			listCollec[index].addTask(task);
		}else{
			console.warn('List not found');
		}
	}

	function removeTask(listId, taskId) {
		var task = listCollec[listId].getTask(taskId);
		console.log(task);

		listCollec[listId].removeTask(task);
		alert('task removed');
	}

	function completeTask(listId, taskId) {
		var task = listCollec[listId].getTask(taskId);
		console.log(task)
		task.toggleStatus()
		console.log(task) 

	}

	function updateDom() {
		
		for(var i in listCollec) {
			var html = `<div class="row">
			<div class="col">
				<h4>${listCollec[i].name}</h4>`
				for(var task of listCollec[i].tasks) {
					var content = task.isComplete ? `<s>${task.content}</s>`: task.content
					html +=`<div class="task-wrap">
					<div class="row">
						<div class="col">
							<span>${content}</span>
						</div>
						<div class="col">
							<small>Date</small>
							<button class="task-remove-btn"
							 data-list-id="${i}" 
							 data-task-id="${task.id}">Remove</button>
							<button class="task-complete-btn" data-task-id="${task.id}"
							data-list-id="${i}">Complete</button>
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

	// Storage Function 
});

	