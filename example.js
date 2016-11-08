angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function (moment, alert, calendarConfig, $http, $scope, $filter) {

      var vm = this;

      //These variables MUST be set as a minimum for the calendar to work
      vm.calendarView = 'month';
      $http.get('/calc').success(function (responce) {
          debugger;
          var re = responce;
          for (i = 0; i < responce.length; i++) {
              var Title = responce[i].title;
              var start = responce[i].startsAt;
              // var t = (start).format("EEE MMM dd yyyy HH:hh:ss 'GMT'Z '(India Standard Time)'")$filter('date')(start, "EEE MMM dd yyyy HH:hh:ss 'GMT'Z '(India Standard Time) {}'");;
             //$filter('date')(end, "EEE MMM dd yyyy HH:hh:ss 'GMT'Z '(India Standard Time) {}'");
              var startTime = new Date(start); 
              var end = responce[i].endsAt;
              var endTime = new Date(end); 
              var id = responce[i]._id;
              vm.eventStart.push({
                  _id: id,
                  title: Title,
                  startsAt: startTime,
                  endsAt: endTime,
                  color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                      primary: '#e3bc08', // the primary event color (should be darker than secondary)moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate()
                      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
                  },
                  actions: actions,
                  draggable: true,
                  resizable: true
              });
          }
      }).error(function () {
      });
      $scope.eventStart = vm.eventStart;
      vm.viewDate = new Date();
      var actions = [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function (args) {
              debugger;
              // $scope.io= alert.show('Edited', args.calendarEvent);
              alert.show('Edited', args.calendarEvent, vm.eventStart).success(function (messages) {
                  debugger;
                  $scope.messages = messages;
              }).error(function (re) { }); ;

          }
      }, {
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function (args) {
              debugger;
              //              alert.show('Deleted', args.calendarEvent);
              var retVal = confirm("Do you want to continue ?");
              if (retVal == true) {
                  for (var i = vm.eventStart.length - 1; i >= 0; i--) {
                      if (vm.eventStart[i].title == args.calendarEvent.title) {
                          vm.eventStart.splice(i, 1);
                      }
                      var parameters = {
                          _id: args.calendarEvent._id
                      };
                      $http.get('/DeleteEvent/', { params: parameters }).success(function (responce) {
                          debugger;
                          var i = responce;

                      }).error(function (rs) {

                      });

                  }

              } else {
              }
          }
      }];
      vm.events = [
      {
          title: 'An event',
          color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
              primary: '#e3bc08', // the primary event color (should be darker than secondary)
              secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
          },
          startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
          endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
          draggable: true,
          resizable: true,
          actions: actions
      },
          {
              title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
              color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#e3bc08', // the primary event color (should be darker than secondary)
                  secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
              },
              startsAt: moment().subtract(1, 'day').toDate(),
              endsAt: moment().add(5, 'days').toDate(),
              draggable: true,
              resizable: true,
              actions: actions
          },
          {
              title: 'This is a really long event title that occurs on every year',
              color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#e3bc08', // the primary event color (should be darker than secondary)
                  secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
              },
              startsAt: moment().startOf('day').add(7, 'hours').toDate(),
              endsAt: moment().startOf('day').add(19, 'hours').toDate(),
              recursOn: 'year',
              draggable: true,
              resizable: true,
              actions: actions
          }
    ];

      vm.cellIsOpen = true;

      vm.addEvent = function () {
          debugger;
          var title = document.getElementById('title').value;
          var EndDate = document.getElementById('EndDate').value;
          var startDate = document.getElementById('startDate').value;
          var StartTime = $scope.event.startsAt;
          var EndTime = $scope.event.endsAt;

          var parameters = {
              title: title,
              startsAt: StartTime,
              endsAt: EndTime
          };
          console.log(parameters);
          $http.get('/view/', { params: parameters }).success(function (success) {
              debugger;
              console.log("posted successfully");
              vm.eventStart.push({
                  title: title,
                  startsAt: StartTime,
                  endsAt: EndTime,
                  color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                      primary: '#e3bc08', // the primary event color (should be darker than secondary)
                      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                  },
                  draggable: true,
                  resizable: true,
                  actions: actions
              });
              res.redirect(req.get('referer'));
              document.getElementById('Div1').style.display = 'none';
          }).error(function (error) {
              console.log(error);
          });
      };

      vm.eventClicked = function (event) {
          alert.show('Clicked', event, vm.eventStart);
      };

      vm.eventEdited = function (event) {
          alert.show('Edited', event);
      };

      vm.eventDeleted = function (event) {
          alert.show('Deleted', event);
      };

      vm.eventTimesChanged = function (event) {
          alert.show('Dropped or resized', event);
      };

      vm.toggle = function ($event, field, event) {
          debugger;
          $event.preventDefault();
          $event.stopPropagation();
          event[field] = !event[field];
      };
      vm.changed = function () {
          debugger;
          console.log('Time changed to: ' + $scope.event.endsAt);
      };
      vm.timespanClicked = function (date, cell) {
          debugger;
          if (vm.calendarView === 'month') {
              if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || !cell.inMonth) {
                  vm.cellIsOpen = false;
                  for (var i = vm.eventStart.length - 1; i >= 0; i--) {
                      if (vm.eventStart[i]._id === 0) {
                          vm.eventStart.splice(i, 1);
                      }
                  }

              } else {
                  if (cell.events.length === 0) {
                      debugger;
                      vm.cellIsOpen = true;
                      vm.viewDate = date;
                      vm.eventStart.push({
                          _id: 0,
                          title: 'Add your Event',
                          startsAt: date,
                          endsAt: date,
                          color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                              primary: '#e3bc08', // the primary event color (should be darker than secondary)
                              secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                          },
                          actions: [{ // an array of actions that will be displayed next to the event title
                              label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                              cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                              onClick: function (args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                                  alert.show('Edited', args.calendarEvent, vm.eventStart);
                              }
                          }],
                          draggable: true,
                          resizable: true
                      });
                  } else {
                      vm.cellIsOpen = true;
                      vm.viewDate = date;
 vm.eventStart.push({
                          _id: 0,
                          title: 'Add your Event',
                          startsAt: date,
                          endsAt: date,
                          color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                              primary: '#e3bc08', // the primary event color (should be darker than secondary)
                              secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                          },
                          actions: [{ // an array of actions that will be displayed next to the event title
                              label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                              cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                              onClick: function (args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                                  alert.show('Edited', args.calendarEvent, vm.eventStart);
                              }
                          }],
                          draggable: true,
                          resizable: true
                      });
                  }
              }
          } else if (vm.calendarView === 'year') {
              if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                  vm.cellIsOpen = false;
              } else {
                  vm.cellIsOpen = true;
                  vm.viewDate = date;
              }
          }else if (vm.calendarView === 'day') {
              if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month')))) {
                  vm.cellIsOpen = true;
                  vm.viewDate = date;
              } else {
                  vm.cellIsOpen = true;
                  vm.viewDate = date;
              }
          }


      };

  });
