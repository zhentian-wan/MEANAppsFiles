/**
 * Created by Answer1215 on 5/28/2015.
 */

function SignupFormFactory($translate) {
    var factory = {};

    factory.fields = [
        {
            key: 'username',
            type: 'input',
            templateOptions: {
                label: $translate.instant('form.userName'),
                required: true,
                placeholder: $translate.instant('form.enterUserName')
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: $translate.instant('form.email'),
                required: true,
                placeholder: $translate.instant('form.enterEmail')
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: $translate.instant('form.password'),
                minlength: 4,
                required: true,
                placeholder: $translate.instant('form.enterPassword')
            }
        },
        {
            key: 'password-again',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: $translate.instant('form.repeatPassword'),
                minlength: 4,
                required: true,
                placeholder: $translate.instant('form.enterRepeatPassword')
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
                label: $translate.instant('form.firstName'),
                required: true,
                placeholder: $translate.instant('form.enterFirstName')
            }
        },
        {
            key: 'lname',
            type: 'input',
            templateOptions: {
                label: $translate.instant('form.lastName'),
                required: true,
                placeholder: $translate.instant('form.enterLastName')
            }
        }
    ];

    return factory;
}

angular.module('app.user')

    .factory('SignupFormFactory', SignupFormFactory);