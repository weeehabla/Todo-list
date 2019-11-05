var List = function(name) {
	var instence = {};
	instence.name = name;
	instence.tasks = [];
	instence.addTask = addTask;
	instence.removeTask = removeTask;
	instence.getTask = getTask;

	return instence
}

var addTask = function(task) {
	this.tasks.push(task);
}

var removeTask = function(task) {
	var index = this.tasks.findIndex(function(elemnt) {
		return task.id === elemnt.id 
	});
	
	if(index >= 0){
		this.tasks.splice(index,1);
	}else{
		console.warn('Task Not Found');
	}

}

var getTask = function(id) {
	return this.tasks.find(function(elem) {
		return id === elem.id;
	});
}

/*
	==================== TASK ===================

	Priority scheme:
	0: highest
	1: medium
*/


var Task = function(content) {
	var instance = {};

	instance.content = content;
	instance.isComplete = false;
	instance.created_at = new Date();
	instance.priority = 0;
	instance.id = Math.floor((Math.random() * 1000) + 1);
	instance.toggleStatus = toggleStatus;
	instance.changePriority = changePriority;

	return instance;
}

var toggleStatus = function() {
	this.isComplete = ! this.isComplete;
}

var changePriority = function(p) {
	if(typeof p === 'number'){
		this.priority = p;
	}else{
		console.warn('Please enter a number');
	}
}