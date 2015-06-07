/**
 * Created by Answer1215 on 5/28/2015.
 */

function SignupFormFactory() {
    var factory = {};

    factory.fields = [
        {
            key: 'username',
            type: 'input',
            templateOptions: {
                label: 'Username: ',
                required: true,
                placeholder: 'Enter username'
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address: ',
                required: true,
                placeholder: 'Enter email'
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Password: ',
                minlength: 4,
                required: true,
                placeholder: 'Enter password'
            }
        },
        {
            key: 'password-again',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Repeat password: ',
                minlength: 4,
                required: true,
                placeholder: 'Enter password again'
            },
            validators: {
                equals: function($viewValue, $modelValue, scope) {
                    console.log(scope.model.password);
                    if($viewValue && $modelValue) {
                        return scope.model.password === $viewValue;
                    }
                }
            },
            modelOptions: {
                updateOn: 'blur'
            }
        },
        {
            key: 'fname',
            type: 'input',
            templateOptions: {
                label: 'First name: ',
                required: true,
                placeholder: 'Enter first name'
            }
        },
        {
            key: 'lname',
            type: 'input',
            templateOptions: {
                label: 'Last name: ',
                required: true,
                placeholder: 'Enter last name'
            }
        }
    ];

    return factory;
}

angular.module('app.user')

    .factory('SignupFormFactory', SignupFormFactory);