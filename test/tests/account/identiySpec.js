/**
 * Created by Answer1215 on 5/15/2015.
 */
describe('loginService', function() {

    var loginService;

    beforeEach(module('app'));
    beforeEach(inject(function(_loginService_){
        loginService = _loginService_;
    }));

    describe('isAuthed', function() {
        it('should return false when user is not authed', function() {
            console.log(loginService.fortesting('not admin'));
            expect(loginService.fortesting('not admin')).to.be.falsey;
        });

        it('should return true', function() {
            console.log(loginService.fortesting('admin'));
            expect(loginService.fortesting('admin')).to.be.true;
        });
    });
});