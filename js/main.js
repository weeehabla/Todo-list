$(document).ready(function() {
	var body = $('body');
	var listCollec = [];
	var st = localStorage;
	var key = 'listCollc';

	// Get data from Local storage
	getData();

	$('body').on('submit', '#create-list-form', function(e){
		// Update later make sure that no list exist
		// with same name;
		e.preventDefault(); // prevent default action 

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
	$('body').on('submit', '#create-task-form',function(e) {
		e.preventDefault();
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
			var list = 
			` <div class="container mx-5">
                <div class="row">
                    <div class="col">
                        <h3>${listCollec[i].name}</h3>
                    </div>
                </div>
            </div>`;

        for(var task of listCollec[i].tasks) {
			var content = task.isComplete ? `<s>${task.content}</s>`: task.content;

            list += 
            `<div class="task-wrap">
                <div class="row">
                    <div class="col-12">
                        <div class="content-wrap">
                            <p>${content}</p>
                            <small class="date">${task.created_at.toLocaleString()}</small>
                        </div>
                    </div>
                    <div class="col align-vertical-center">
                        <div>
                            <button title="Delete Task" class="btn-dodger task-remove-btn" data-list-id="${i}" data-task-id="${task.id}">&cross;
                            </button>
                              <label class="checkbox-container">
                                    <input ${task.isComplete ? 'checked':''} type="checkbox" name="Complete" data-task-id="${task.id}" data-list-id="${i}" title="Toggle Status" class="task-complete-btn">
                                    <span class="checkmark"></span>
                              </label>
                        </div>
                    </div>
                </div>
            </div>`;
		}

		html += list;
		} // / for Loop

		$("#show").html(html).hide().fadeIn('slow');
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
		console.log(data)
		if(data !== null){
			var storeData = JSON.parse(data).forEach(function(val) {
				var listTasks = val.tasks.map(function(task) {
					var taskInstance = new Task(task.content, task.isComplete, task.created_at, task.id);
					return taskInstance;
				});

				var list = new List(val.name, listTasks);
				listCollec.push(list);
			});
			console.log(listCollec)
		}

		updateList();
		updateDom();
	}
});

	