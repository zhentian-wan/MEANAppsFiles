describe('buttons', function () {

  var $scope, $compile;

  beforeEach(module('ui.bootstrap.buttons'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('checkbox', function () {

    var compileButton = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    //models -> UI
    it('should work correctly with default models values', function () {
      $scope.model = false;
      var btn = compileButton('<button ng-models="models" btn-checkbox>click</button>', $scope);
      expect(btn).not.toHaveClass('active');

      $scope.model = true;
      $scope.$digest();
      expect(btn).toHaveClass('active');
    });

    it('should bind custom models values', function () {
      $scope.model = 1;
      var btn = compileButton('<button ng-models="models" btn-checkbox btn-checkbox-true="1" btn-checkbox-false="0">click</button>', $scope);
      expect(btn).toHaveClass('active');

      $scope.model = 0;
      $scope.$digest();
      expect(btn).not.toHaveClass('active');
    });

    //UI-> models
    it('should toggle default models values on click', function () {
      $scope.model = false;
      var btn = compileButton('<button ng-models="models" btn-checkbox>click</button>', $scope);

      btn.click();
      expect($scope.model).toEqual(true);
      expect(btn).toHaveClass('active');

      btn.click();
      expect($scope.model).toEqual(false);
      expect(btn).not.toHaveClass('active');
    });

    it('should toggle custom models values on click', function () {
      $scope.model = 0;
      var btn = compileButton('<button ng-models="models" btn-checkbox btn-checkbox-true="1" btn-checkbox-false="0">click</button>', $scope);

      btn.click();
      expect($scope.model).toEqual(1);
      expect(btn).toHaveClass('active');

      btn.click();
      expect($scope.model).toEqual(0);
      expect(btn).not.toHaveClass('active');
    });

    it('should monitor true / false value changes - issue 666', function () {

      $scope.model = 1;
      $scope.trueVal = 1;
      var btn = compileButton('<button ng-models="models" btn-checkbox btn-checkbox-true="trueVal">click</button>', $scope);

      expect(btn).toHaveClass('active');
      expect($scope.model).toEqual(1);

      $scope.model = 2;
      $scope.trueVal = 2;
      $scope.$digest();

      expect(btn).toHaveClass('active');
      expect($scope.model).toEqual(2);
    });

    describe('setting buttonConfig', function () {
      var originalActiveClass, originalToggleEvent;

      beforeEach(inject(function(buttonConfig) {
        originalActiveClass = buttonConfig.activeClass;
        originalToggleEvent = buttonConfig.toggleEvent;
        buttonConfig.activeClass = false;
        buttonConfig.toggleEvent = false;
      }));

      afterEach(inject(function(buttonConfig) {
        // return it to the original value
        buttonConfig.activeClass = originalActiveClass;
        buttonConfig.toggleEvent = originalToggleEvent;
      }));

      it('should use default config when buttonConfig.activeClass and buttonConfig.toggleEvent is false', function () {
        $scope.model = false;
        var btn = compileButton('<button ng-models="models" btn-checkbox>click</button>', $scope);
        expect(btn).not.toHaveClass('active');

        $scope.model = true;
        $scope.$digest();
        expect(btn).toHaveClass('active');
      });
    });

  });

  describe('radio', function () {

    var compileButtons = function (markup, scope) {
      var el = $compile('<div>'+markup+'</div>')(scope);
      scope.$digest();
      return el.find('button');
    };

    //models -> UI
    it('should work correctly set active class based on models', function () {
      var btns = compileButtons('<button ng-models="models" btn-radio="1">click1</button><button ng-models="models" btn-radio="2">click2</button>', $scope);
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      $scope.model = 2;
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');
    });

    //UI->models
    it('should work correctly set active class based on models', function () {
      var btns = compileButtons('<button ng-models="models" btn-radio="1">click1</button><button ng-models="models" btn-radio="2">click2</button>', $scope);
      expect($scope.model).toBeUndefined();

      btns.eq(0).click();
      expect($scope.model).toEqual(1);
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      btns.eq(1).click();
      expect($scope.model).toEqual(2);
      expect(btns.eq(1)).toHaveClass('active');
      expect(btns.eq(0)).not.toHaveClass('active');
    });

    it('should watch btn-radio values and update state accordingly', function () {
      $scope.values = ['value1', 'value2'];

      var btns = compileButtons('<button ng-models="models" btn-radio="values[0]">click1</button><button ng-models="models" btn-radio="values[1]">click2</button>', $scope);
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      $scope.model = 'value2';
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');

      $scope.values[1] = 'value3';
      $scope.model = 'value3';
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');
    });

    it('should do nothing when click active radio', function () {
      $scope.model = 1;
      var btns = compileButtons('<button ng-models="models" btn-radio="1">click1</button><button ng-models="models" btn-radio="2">click2</button>', $scope);
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      btns.eq(0).click();
      $scope.$digest();
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');
    });

    describe('uncheckable', function () {
      //models -> UI
      it('should set active class based on models', function () {
        var btns = compileButtons('<button ng-models="models" btn-radio="1" uncheckable>click1</button><button ng-models="models" btn-radio="2" uncheckable>click2</button>', $scope);
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        $scope.model = 2;
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).toHaveClass('active');
      });

      //UI->models
      it('should unset active class based on models', function () {
        var btns = compileButtons('<button ng-models="models" btn-radio="1" uncheckable>click1</button><button ng-models="models" btn-radio="2" uncheckable>click2</button>', $scope);
        expect($scope.model).toBeUndefined();

        btns.eq(0).click();
        expect($scope.model).toEqual(1);
        expect(btns.eq(0)).toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        btns.eq(0).click();
        expect($scope.model).toBeNull();
        expect(btns.eq(1)).not.toHaveClass('active');
        expect(btns.eq(0)).not.toHaveClass('active');
      });

      it('should watch btn-radio values and update state', function () {
        $scope.values = ['value1', 'value2'];

        var btns = compileButtons('<button ng-models="models" btn-radio="values[0]" uncheckable>click1</button><button ng-models="models" btn-radio="values[1]" uncheckable>click2</button>', $scope);
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        $scope.model = 'value2';
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).toHaveClass('active');

        $scope.model = undefined;
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');
      });
    });
  });
});
