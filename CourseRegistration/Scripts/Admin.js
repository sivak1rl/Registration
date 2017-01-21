(function () {
    var app = angular.module("AdminApp", []);
    app.controller("AdminController", ['$http', function ($http) {
        this.Courses = [];
        this.Students = [];

        var self = this;

        $http.get("/Home/GetCourses").then(
            function (retVal) {
                self.Courses = retVal.data;
                console.log(self.Courses);
            }, function () {

            }
        );
        $http.get("/Home/GetStudents").then(
            function (retVal) {
                self.Students = retVal.data;
            }, function () {

            }
        );
        this.ChooseCourse = function () {
            $http.get("/Home/GetCourse", { params: { courseId: self.CourseId } }).then(function (retVal) {
                self.Course = retVal.data;
                console.log(self.Course);
            }, function () {

            }
            );
        }

        this.ChooseStudent = function () {
            $http.get("/Home/GetStudent", { params: { studentId: self.StudentId } }).then(function (retVal) {
                self.Student = retVal.data;
                console.log(self.Student);
            }, function () {

            }
            );
        }

        this.Register = function (courseId) {
            self.Errors = [];
            $http.post('/Home/Register', { courseId: courseId, studentId: self.Student.Id })
            .then(function (retVal) {
                console.log(retVal.data);
                self.Student.Courses.push(retVal.data);
            }, function (retval) {
                self.Errors.push({ key: 'Registering for that course failed', value: retval.data.Errors });
            });
        }

        this.DropCourse = function (courseId) {
            if (confirm('Are you sure you would like to drop this course?')) {
                self.Errors = [];
                $http.post('/Home/Drop', { courseId: courseId, studentId: self.Student.Id })
                .then(function (retval) {
                    console.log(self.Student)
                    console.log(self.Student.Courses)
                    self.Student.Courses = self.Student.Courses.filter(function (el) {
                        return el.Id != courseId;
                    });
                    console.log(self.Student.Courses)
                }, function (retval) {
                    self.Errors.push({ key: 'Dropping Course', value: retval.data.Errors });
                });
            }
        }

    }]);
})();