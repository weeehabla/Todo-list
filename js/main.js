$(document).ready(function() {
	var body = $('body');
	var listCollec = [];
	var st = localStorage;
	var key = 'listCollc';

	// Get data from Local storage
	// getData();

	$('#create-list-btn').on('click', function(){
		// Update later make sure that no list exist
		// with same name;

		var listName = $('#create-list-input').val();

		if(listName === ''){
			alert('Please enter a list name');
			return false;
		}

		var list = List(listName); 

		listCollec.push(list);
		$('#create-list-input').val('');

		console.log(listCollec);
		updateList();
		saveData();
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
		saveData();
	});

	// Handle Delete Task 
	$("body").on("click", '.task-remove-btn', function() {
		var src = $(this);
		var listId = parseInt(src.attr('data-list-id'));
		var taskId = parseInt(src.attr('data-task-id'));

		removeTask(listId, taskId);
		updateDom();
		saveData();
	});

	// Handle Compelte Task.
	$("body").on("click", ".task-complete-btn", function() {
		var src = $(this);
		var listId = parseInt(src.attr('data-list-id'));
		var taskId = parseInt(src.attr('data-task-id'));
		completeTask(listId, taskId);
		updateDom();
		saveData();
	});



	function saveTask() {
		var list = $('#list-select');
		var listName = list.val();
		var index = listCollec.findIndex(function(list) {
			return listName === list.name;	
 		});
		
		if(index >= 0){
			var input = $("#create-task-input");
			var content = input.val();
			if(content === ''){
				alert('Please enter a task!');
				return false;
			}

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
		var html = '';

		for(var i in listCollec) {
			var list = `<div class="row">
			<div class="col">
				<h4>${listCollec[i].name}</h4>`
				for(var task of listCollec[i].tasks) {
					var content = task.isComplete ? `<s>${task.content}</s>`: task.content
					list +=`<div class="task-wrap">
					<div class="row">
						<div class="col">
							<span>${content}</span>
						</div>
						<div class="col">
							<small>Date</small>
							<button title="Delete Task"
							 class="task-remove-btn"
							 data-list-id="${i}" 
							 data-task-id="${task.id}">&cross;</button>
							<button title="Mark as Complete"
							class="task-complete-btn" 
							data-task-id="${task.id}"
							data-list-id="${i}">&check;</button>
						</div>
					</div>
				</div>`

				}	
			list +=`
			</div>
		</div>`;

		html += list;
		} // / for Loop

		$("#show").html(html)
	}

	// Background Image
	var backImage = 'https://picsum.photos/1920/1080';

	
	// body.css('background',`url(${backImage})`)
	// 	.css('background-size','cover');

	// Storage Function

	function saveData() {
		st.setItem(key, JSON.stringify(listCollec));
	}

	function getData() {
		var data = st.getItem(key);
		//listCollec = data !== null ? JSON.parse(data) : listCollec;
		var data2 = JSON.parse(data).map(function(elemnt, key){
			elemnt.addTask = addTask;
			elemnt.removeTask = removeTask;
			elemnt.getTask = getTask;

			return elemnt ;

		})
		listCollec = data2;
		updateList();
		updateDom();
	}
// For Refactoring 

	// var addTask = function(task) {
	// 	this.tasks.push(task);
	// }

	// var removeTask = function(task) {
	// 	var index = this.tasks.findIndex(function(elemnt) {
	// 		return task.id === elemnt.id 
	// 	});
		
	// 	if(index >= 0){
	// 		this.tasks.splice(index,1);
	// 	}else{
	// 		console.warn('Task Not Found');
	// 	}

	// }

	// var getTask = function(id) {
	// 	return this.tasks.find(function(elem) {
	// 		return id === elem.id;
	// 	});
	// }

});

	