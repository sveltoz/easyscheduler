angular
  .module('mwl.calendar.docs')
  .factory('alert', function ($uibModal) {
      function show(action, event, eventStart) {
          return modal_instance = $uibModal.open({
              templateUrl: 'modalContent.html',
              controller: function ($http, $uibModal, $scope) {
                  debugger;
                  var vm = this;
                  vm.action = action;
                  vm.event = event;
                 
                  vm.toggle = function ($event, field, event) {
                      debugger;
                      $event.preventDefault();
                      $event.stopPropagation();
                      event[field] = !event[field];
                  };
                  vm.addEvent = function (event) {
                      debugger;
                      var _id = event._id;
                      var title = event.title;
                      var StartTime = event.startsAt;
                      var EndTime = event.endsAt;
                      var parameters = {
                          id: _id,
                          title: title,
                          startsAt: StartTime,
                          endsAt: EndTime
                      };
                      console.log(parameters);
                      $http.get('/update/', { params: parameters }).success(function (success) {
                          debugger;
                          console.log("posted successfully");
                          if (_id === 0) {
                              eventStart.push({
                                   _id:success._id,
                                  title: title,
                                  startsAt: StartTime,
                                  endsAt: EndTime,
                                  color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                                      primary: '#e3bc08', // the primary event color (should be darker than secondary)
                                      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                                  },
                                  draggable: true,
                                  resizable: true
                              });
                          }
                          modal_instance.close();
                          return event;
                      }).error(function (error) {
                          console.log(error);
                      });
                  };
                 
              },
              controllerAs: 'vm'
          });
      }
      return {
          show: show
      };

  });
