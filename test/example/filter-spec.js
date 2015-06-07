/**
 * Created by Answer1215 on 5/30/2015.
 */
describe('filter', function() {

    var $filter,
        filter;

    beforeEach(function() {
        module('filter');
        inject(function($injector) {
            $filter = $injector.get('$filter');
            filter = $filter('titleCase');
        })
    });

    describe('title case filter', function() {
       it('if undefined passed in return undefined', function() {
           expect(filter(undefined)).toBeUndefined();
       }) ;

        it('if null passed in retrun null', function() {
            expect(filter(null)).toBeNull();
        });

        it('if empty string passed in return empty', function() {
            expect(filter('')).toBe('');
        });

        it('if all lower case passed in retrun title case', function() {
            expect(filter('this is lower case')).toBe('This Is Lower Case');
        });

        it('all upper case passed in', function() {
            expect(filter('HELLO A DOG')).toBe('Hello A Dog');
        });

        it('random case passed in', function() {
            expect(filter('HeY, How wAs yOuR DREAm')).toBe('Hey, How Was Your Dream');
        });

        it('normal case passed in', function() {
            expect(filter('What A Good Day')).toBe('What A Good Day');
        });
    });
})