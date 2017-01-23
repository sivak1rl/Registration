(function () {
    var app = angular.module("StudentApp", []);

    app.controller("StudentController", ['$http', function ($http) {
        var self = this;
        this.LoggedIn = false;
        this.UserId = '';
        this.User = {};
        this.Errors = [];

        this.Courses = [];

        $http.get(baseSiteURL + 'Home/GetCourses').then(
            function (retVal) {
                self.Courses = retVal.data;
                self.Courses = self.Courses.filter(function (el) {
                    return el.Capacity - el.RegisteredCount > 0;
                });
            }, function (retVal) {
                self.Errors.push({ key: "Courses", value: "An error occurred loading the courses, please try again." });
            }
        );

        this.Login = function (url) {
            self.User = {};
            self.Errors = [];
            if (self.UserId && self.Password) {
                $http.get(url + '?studentId=' + self.UserId).then(
                    function (retVal) {
                        self.User = retVal.data;
                        if (!self.User.Courses) {
                            self.User.Courses = [];
                        } else {
                            for (var i = 0; i < self.User.Courses.length; i++) {
                                self.Courses = self.Courses.filter(function (el) {
                                    return el.Id !== self.User.Courses[i].Id;
                                });
                            }
                        }
                        self.User.SelectedCourses = [];
                        self.LoggedIn = true;
                    },
                    function (retVal) {
                        console.log(retVal);
                        self.Errors.push({ key: "User ID", value: "There was no user with that User ID" })
                    }
                );
            } else {
                self.Errors.push({ key: "User ID or Password", value: "You must provide a valid User ID and a password. The password for this application can be anything" });
            }
        }
        this.Logout = function () {
            self.User = {};
            self.LoggedIn = false;
            self.Errors = [];
            return;
        }

        this.AddToSelected = function (index) {
            self.User.SelectedCourses.push(self.Courses[index]);
            self.Courses.splice(index, 1);
        }

        this.Register = function (index) {
            self.Errors = [];
            $http.post(baseSiteURL + 'Home/Register', { courseId: self.User.SelectedCourses[index].Id, studentId: self.User.Id })
            .then(function () {
                self.User.Courses.push(self.User.SelectedCourses[index]);
                self.User.SelectedCourses.splice(index, 1);
            }, function (retval) {
                self.Errors.push({ key: 'Registering for that Course', value: retval.data.Errors });
            });
        }
        this.Drop = function (index) {
            if (confirm('Are you sure you would like todrop this course?')) {
                self.Errors = [];
                $http.post(baseSiteURL + '/Home/Drop', { courseId: self.User.Courses[index].Id, studentId: self.User.Id })
                .then(function (retval) {
                    self.Courses.push(retval.data);
                    self.Courses.sort(function (a, b) { return a.CourseId.localeCompare(b.CourseId); })
                    self.User.Courses.splice(index, 1);
                }, function (retval) {
                    self.Errors.push({ key: 'Dropping Course', value: retval.data.Errors });
                });
            }
        }
        this.Remove = function (index) {
            self.Courses.push(self.User.SelectedCourses[index]);
            self.Courses.sort(function (a, b) { return a.CourseId.localeCompare(b.CourseId); })
            self.User.SelectedCourses.splice(index, 1);

        }

        app.directive('focusOnShow', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {
                    if ($attr.ngShow) {
                        $scope.$watch($attr.ngShow, function (newValue) {
                            if (newValue) {
                                $timeout(function () {
                                    $element[0].focus();
                                }, 0);
                            }
                        })
                    }
                    if ($attr.ngHide) {
                        $scope.$watch($attr.ngHide, function (newValue) {
                            if (!newValue) {
                                $timeout(function () {
                                    $element[0].focus();
                                }, 0);
                            }
                        })
                    }

                }
            };
        })


    }]);
})();