// function AppCtrl(){
	// //console.log("This is controller!!");
// }


var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
    // console.log("This is controller!!");
	
	var refresh = function(){
		$http.get("/contactlist").success(function(response){
			console.log("I got the requested data.");
			$scope.contactlist = response;
			$scope.contact = '';
		});
	}
	
	refresh();
	
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(res){
			console.log(res);
			refresh();
		});
	}
	
	$scope.removeContact = function(id){
		console.log("Delete id:" + id);
		$http.delete("/contactlist/" + id).success(function(res){
			refresh();
		});
	};
	
	//This will fetch contact record to EDIT.
	$scope.editContact = function(id){
		console.log("Edit id:" + id);
		$http.get("/contactlist/" + id).success(function(res){
			$scope.contact = res;
		});
	};
	
	//This will save the edited contact record.
	$scope.updateContact = function(){
		$http.put("/contactlist/" + $scope.contact._id, $scope.contact).success(function(res){
			$scope.contact = '';
			refresh();
		});
	};
	
	
	
	
});