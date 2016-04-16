app.directive('passwordValidate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if (scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);
                    return undefined;
                }

            });
        }
    };
});


app.directive('telInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 9);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});
app.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 6);
            } else {
                number === number;
            }

            return (city + "-" + number).trim();
        } else {
            return city;
        }

    };
});


app.directive('mobileInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('mobile')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('mobile')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});
app.filter('mobile', function () {
    return function (mobile) {
        console.log(mobile);
        if (!mobile) {
            return '';
        }

        var value = mobile.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return mobile;
        }

        var city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            } else {
                number === number;
            }

            return (city + "-" + number).trim();
        } else {
            return city;
        }

    };
});


app.directive('pidInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('pid')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 13);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('pid')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});

app.filter('pid', function () {
    return function (pid) {
        console.log(pid);
        if (!pid) {
            return '';
        }

        var value = pid.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return pid;
        }

        var numberPid, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                numberPid = value;
                break;
            default:
                numberPid = value.slice(0, 1);
                number = value.slice(1);
        }

        if (number) {
            if (number.length > 1) {
                number = number.slice(0, 4) + '-' + number.slice(4, 9) + '-' + number.slice(9, 11) + '-' + number.slice(11, 12);
            } else {
                number === number;
            }

            return (numberPid + "-" + number).trim();
        } else {
            return numberPid;
        }

    };
});


app.directive('pbangkInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('pbang')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('pbang')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});

app.filter('pbang', function () {
    return function (pbang) {
        console.log(pbang);
        if (!pbang) {
            return '';
        }

        var value = pbang.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return pbang;
        }

        var numberPid, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                numberPid = value;
                break;

            default:
                numberPid = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 1) + '-' + number.slice(1, 6) + '-' + number.slice(6, 7);
            } else {
                number === number;
            }

            return (numberPid + "-" + number).trim();
        } else {
            return numberPid;
        }

    };
});




        