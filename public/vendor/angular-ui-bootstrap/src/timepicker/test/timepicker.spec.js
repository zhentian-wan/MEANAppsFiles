describe('timepicker directive', function () {
  var $rootScope, $compile, element;

  beforeEach(module('ui.bootstrap.timepicker'));
  beforeEach(module('template/timepicker/timepicker.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.time = newTime(14, 40);

    element = $compile('<timepicker ng-models="time"></timepicker>')($rootScope);
    $rootScope.$digest();
  }));

  function newTime(hours, minutes) {
    var time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time;
  }

  function getTimeState(withoutMeridian) {
    var inputs = element.find('input');

    var state = [];
    for (var i = 0; i < 2; i ++) {
      state.push(inputs.eq(i).val());
    }
    if ( withoutMeridian !== true ) {
      state.push( getMeridianButton().text() );
    }
    return state;
  }

  function getModelState() {
    return [ $rootScope.time.getHours(), $rootScope.time.getMinutes() ];
  }

  function getArrow(isUp, tdIndex) {
    return element.find('tr').eq( (isUp) ? 0 : 2 ).find('td').eq( tdIndex ).find('a').eq(0);
  }

  function getHoursButton(isUp) {
    return getArrow(isUp, 0);
  }

  function getMinutesButton(isUp) {
    return getArrow(isUp, 2);
  }

  function getMeridianButton() {
    return element.find('button').eq(0);
  }

  function doClick(button, n) {
    for (var i = 0, max = n || 1; i < max; i++) {
      button.click();
      $rootScope.$digest();
    }
  }

  function wheelThatMouse(delta) {
    var e = $.Event('mousewheel');
    e.wheelDelta = delta;
    return e;
  }

  function wheelThatOtherMouse(delta) {
    var e = $.Event('wheel');
    e.deltaY = delta;
    return e;
  }

  function keydown(key) {
    var e = $.Event('keydown');
    switch(key) {
      case 'left':
        e.which = 37;
        break;
      case 'up':
        e.which = 38;
        break;
      case 'right':
        e.which = 39;
        break;
      case 'down':
        e.which = 40;
        break;
    }
    return e;
  }

  it('contains three row & three input elements', function() {
    expect(element.find('tr').length).toBe(3);
    expect(element.find('input').length).toBe(2);
    expect(element.find('button').length).toBe(1);
  });

  it('has initially the correct time & meridian', function() {
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);
  });

  it('should be pristine', function() {
    expect(element.controller('ngModel').$pristine).toBe(true);
  });

  it('has `selected` current time when models is initially cleared', function() {
    $rootScope.time = null;
    element = $compile('<timepicker ng-models="time"></timepicker>')($rootScope);
    $rootScope.$digest();

    expect($rootScope.time).toBe(null);
    expect(getTimeState()).not.toEqual(['', '', '']);
  });

  it('changes inputs when models changes value', function() {
    $rootScope.time = newTime(11, 50);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['11', '50', 'AM']);
    expect(getModelState()).toEqual([11, 50]);

    $rootScope.time = newTime(16, 40);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);
  });

  it('increases / decreases hours when arrows are clicked', function() {
    var up = getHoursButton(true);
    var down = getHoursButton(false);

    doClick(up);
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    doClick(down);
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    doClick(down);
    expect(getTimeState()).toEqual(['01', '40', 'PM']);
    expect(getModelState()).toEqual([13, 40]);
  });

  it('increase / decreases minutes by default step when arrows are clicked', function() {
    var up = getMinutesButton(true);
    var down = getMinutesButton(false);

    doClick(up);
    expect(getTimeState()).toEqual(['02', '41', 'PM']);
    expect(getModelState()).toEqual([14, 41]);

    doClick(down);
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    doClick(down);
    expect(getTimeState()).toEqual(['02', '39', 'PM']);
    expect(getModelState()).toEqual([14, 39]);
  });

  it('meridian button has correct type', function() {
    var button = getMeridianButton();
    expect(button.attr('type')).toBe('button');
  });

  it('toggles meridian when button is clicked', function() {
    var button = getMeridianButton();

    doClick(button);
    expect(getTimeState()).toEqual(['02', '40', 'AM']);
    expect(getModelState()).toEqual([2, 40]);

    doClick(button);
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    doClick(button);
    expect(getTimeState()).toEqual(['02', '40', 'AM']);
    expect(getModelState()).toEqual([2, 40]);
  });

  it('has minutes "connected" to hours', function() {
    var up = getMinutesButton(true);
    var down = getMinutesButton(false);

    doClick(up, 10);
    expect(getTimeState()).toEqual(['02', '50', 'PM']);
    expect(getModelState()).toEqual([14, 50]);

    doClick(up, 10);
    expect(getTimeState()).toEqual(['03', '00', 'PM']);
    expect(getModelState()).toEqual([15, 0]);

    doClick(up, 10);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '10', 'PM']);
    expect(getModelState()).toEqual([15, 10]);

    doClick(down, 10);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '00', 'PM']);
    expect(getModelState()).toEqual([15, 0]);

    doClick(down, 10);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '50', 'PM']);
    expect(getModelState()).toEqual([14, 50]);
  });

  it('has hours "connected" to meridian', function() {
    var up = getHoursButton(true);
    var down = getHoursButton(false);

    // AM -> PM
    $rootScope.time = newTime(11, 0);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['11', '00', 'AM']);
    expect(getModelState()).toEqual([11, 0]);

    doClick(up);
    expect(getTimeState()).toEqual(['12', '00', 'PM']);
    expect(getModelState()).toEqual([12, 0]);

    doClick(up);
    expect(getTimeState()).toEqual(['01', '00', 'PM']);
    expect(getModelState()).toEqual([13, 0]);

    doClick(down);
    expect(getTimeState()).toEqual(['12', '00', 'PM']);
    expect(getModelState()).toEqual([12, 0]);

    doClick(down);
    expect(getTimeState()).toEqual(['11', '00', 'AM']);
    expect(getModelState()).toEqual([11, 0]);

    // PM -> AM
    $rootScope.time = newTime(23, 0);
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['11', '00', 'PM']);
    expect(getModelState()).toEqual([23, 0]);

    doClick(up);
    expect(getTimeState()).toEqual(['12', '00', 'AM']);
    expect(getModelState()).toEqual([0, 0]);

    doClick(up);
    expect(getTimeState()).toEqual(['01', '00', 'AM']);
    expect(getModelState()).toEqual([01, 0]);

    doClick(down);
    expect(getTimeState()).toEqual(['12', '00', 'AM']);
    expect(getModelState()).toEqual([0, 0]);

    doClick(down);
    expect(getTimeState()).toEqual(['11', '00', 'PM']);
    expect(getModelState()).toEqual([23, 0]);
  });

  it('changes only the time part when hours change', function() {
    $rootScope.time = newTime(23, 50);
    $rootScope.$digest();

    var date =  $rootScope.time.getDate();
    var up = getHoursButton(true);
    doClick(up);

    expect(getTimeState()).toEqual(['12', '50', 'AM']);
    expect(getModelState()).toEqual([0, 50]);
    expect(date).toEqual($rootScope.time.getDate());
  });

  it('changes only the time part when minutes change', function() {
    element = $compile('<timepicker ng-models="time" minute-step="15"></timepicker>')($rootScope);
    $rootScope.time = newTime(0, 0);
    $rootScope.$digest();

    var date =  $rootScope.time.getDate();
    var up = getMinutesButton(true);
    doClick(up, 2);
    expect(getTimeState()).toEqual(['12', '30', 'AM']);
    expect(getModelState()).toEqual([0, 30]);
    expect(date).toEqual($rootScope.time.getDate());

    var down = getMinutesButton(false);
    doClick(down, 2);
    expect(getTimeState()).toEqual(['12', '00', 'AM']);
    expect(getModelState()).toEqual([0, 0]);
    expect(date).toEqual($rootScope.time.getDate());

    doClick(down, 2);
    expect(getTimeState()).toEqual(['11', '30', 'PM']);
    expect(getModelState()).toEqual([23, 30]);
    expect(date).toEqual($rootScope.time.getDate());
  });

  it('responds properly on "mousewheel" events', function() {
    var inputs = element.find('input');
    var hoursEl = inputs.eq(0), minutesEl = inputs.eq(1);
    var upMouseWheelEvent = wheelThatMouse(1);
    var downMouseWheelEvent = wheelThatMouse(-1);

    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    // UP
    hoursEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    minutesEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '42', 'PM']);
    expect(getModelState()).toEqual([16, 42]);

    // DOWN
    minutesEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    hoursEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);
  });

  it('responds properly on "wheel" events', function() {
    var inputs = element.find('input');
    var hoursEl = inputs.eq(0), minutesEl = inputs.eq(1);
    var upMouseWheelEvent = wheelThatOtherMouse(-1);
    var downMouseWheelEvent = wheelThatOtherMouse(1);

    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    // UP
    hoursEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    minutesEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( upMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '42', 'PM']);
    expect(getModelState()).toEqual([16, 42]);

    // DOWN
    minutesEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    hoursEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( downMouseWheelEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);
  });

  it('responds properly on "keydown" events', function() {
    var inputs = element.find('input');
    var hoursEl = inputs.eq(0), minutesEl = inputs.eq(1);
    var upKeydownEvent = keydown('up');
    var downKeydownEvent = keydown('down');
    var leftKeydownEvent = keydown('left');

    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    // UP
    hoursEl.trigger( upKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( upKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    minutesEl.trigger( upKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( upKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '42', 'PM']);
    expect(getModelState()).toEqual([16, 42]);

    // DOWN
    minutesEl.trigger( downKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '41', 'PM']);
    expect(getModelState()).toEqual([16, 41]);

    minutesEl.trigger( downKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['04', '40', 'PM']);
    expect(getModelState()).toEqual([16, 40]);

    hoursEl.trigger( downKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['03', '40', 'PM']);
    expect(getModelState()).toEqual([15, 40]);

    hoursEl.trigger( downKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    // Other keydown
    hoursEl.trigger( leftKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);

    minutesEl.trigger( leftKeydownEvent );
    $rootScope.$digest();
    expect(getTimeState()).toEqual(['02', '40', 'PM']);
    expect(getModelState()).toEqual([14, 40]);
  });

  describe('attributes', function () {
    beforeEach(function() {
      $rootScope.hstep = 2;
      $rootScope.mstep = 30;
      $rootScope.time = newTime(14, 0);
      element = $compile('<timepicker ng-models="time" hour-step="hstep" minute-step="mstep"></timepicker>')($rootScope);
      $rootScope.$digest();
    });

    it('increases / decreases hours by configurable step', function() {
      var up = getHoursButton(true);
      var down = getHoursButton(false);

      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      doClick(up);
      expect(getTimeState()).toEqual(['04', '00', 'PM']);
      expect(getModelState()).toEqual([16, 0]);

      doClick(down);
      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      doClick(down);
      expect(getTimeState()).toEqual(['12', '00', 'PM']);
      expect(getModelState()).toEqual([12, 0]);

      // Change step
      $rootScope.hstep = 3;
      $rootScope.$digest();

      doClick(up);
      expect(getTimeState()).toEqual(['03', '00', 'PM']);
      expect(getModelState()).toEqual([15, 0]);

      doClick(down);
      expect(getTimeState()).toEqual(['12', '00', 'PM']);
      expect(getModelState()).toEqual([12, 0]);
    });

    it('increases / decreases minutes by configurable step', function() {
      var up = getMinutesButton(true);
      var down = getMinutesButton(false);

      doClick(up);
      expect(getTimeState()).toEqual(['02', '30', 'PM']);
      expect(getModelState()).toEqual([14, 30]);

      doClick(up);
      expect(getTimeState()).toEqual(['03', '00', 'PM']);
      expect(getModelState()).toEqual([15, 0]);

      doClick(down);
      expect(getTimeState()).toEqual(['02', '30', 'PM']);
      expect(getModelState()).toEqual([14, 30]);

      doClick(down);
      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      // Change step
      $rootScope.mstep = 15;
      $rootScope.$digest();

      doClick(up);
      expect(getTimeState()).toEqual(['02', '15', 'PM']);
      expect(getModelState()).toEqual([14, 15]);

      doClick(down);
      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      doClick(down);
      expect(getTimeState()).toEqual(['01', '45', 'PM']);
      expect(getModelState()).toEqual([13, 45]);
    });

    it('responds properly on "mousewheel" events with configurable steps', function() {
      var inputs = element.find('input');
      var hoursEl = inputs.eq(0), minutesEl = inputs.eq(1);
      var upMouseWheelEvent = wheelThatMouse(1);
      var downMouseWheelEvent = wheelThatMouse(-1);

      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      // UP
      hoursEl.trigger( upMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '00', 'PM']);
      expect(getModelState()).toEqual([16, 0]);

      minutesEl.trigger( upMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '30', 'PM']);
      expect(getModelState()).toEqual([16, 30]);

      // DOWN
      minutesEl.trigger( downMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '00', 'PM']);
      expect(getModelState()).toEqual([16, 0]);

      hoursEl.trigger( downMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);
    });

    it('responds properly on "wheel" events with configurable steps', function() {
      var inputs = element.find('input');
      var hoursEl = inputs.eq(0), minutesEl = inputs.eq(1);
      var upMouseWheelEvent = wheelThatOtherMouse(-1);
      var downMouseWheelEvent = wheelThatOtherMouse(1);

      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      // UP
      hoursEl.trigger( upMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '00', 'PM']);
      expect(getModelState()).toEqual([16, 0]);

      minutesEl.trigger( upMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '30', 'PM']);
      expect(getModelState()).toEqual([16, 30]);

      // DOWN
      minutesEl.trigger( downMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['04', '00', 'PM']);
      expect(getModelState()).toEqual([16, 0]);

      hoursEl.trigger( downMouseWheelEvent );
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);
    });

    it('can handle strings as steps', function() {
      var upHours = getHoursButton(true);
      var upMinutes = getMinutesButton(true);

      expect(getTimeState()).toEqual(['02', '00', 'PM']);
      expect(getModelState()).toEqual([14, 0]);

      $rootScope.hstep = '4';
      $rootScope.mstep = '20';
      $rootScope.$digest();

      doClick(upHours);
      expect(getTimeState()).toEqual(['06', '00', 'PM']);
      expect(getModelState()).toEqual([18, 0]);

      doClick(upMinutes);
      expect(getTimeState()).toEqual(['06', '20', 'PM']);
      expect(getModelState()).toEqual([18, 20]);
    });

  });

  describe('12 / 24 hour mode', function () {
    beforeEach(function() {
      $rootScope.meridian = false;
      $rootScope.time = newTime(14, 10);
      element = $compile('<timepicker ng-models="time" show-meridian="meridian"></timepicker>')($rootScope);
      $rootScope.$digest();
    });

    function getMeridianTd() {
      return element.find('tr').eq(1).find('td').eq(3);
    }

    it('initially displays correct time when `show-meridian` is false', function() {
      expect(getTimeState(true)).toEqual(['14', '10']);
      expect(getModelState()).toEqual([14, 10]);
      expect(getMeridianTd()).toBeHidden();
    });

    it('toggles correctly between different modes', function() {
      expect(getTimeState(true)).toEqual(['14', '10']);

      $rootScope.meridian = true;
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['02', '10', 'PM']);
      expect(getModelState()).toEqual([14, 10]);
      expect(getMeridianTd()).not.toBeHidden();

      $rootScope.meridian = false;
      $rootScope.$digest();
      expect(getTimeState(true)).toEqual(['14', '10']);
      expect(getModelState()).toEqual([14, 10]);
      expect(getMeridianTd()).toBeHidden();
    });

    it('handles correctly initially empty models on parent element', function() {
      $rootScope.time = null;
      element = $compile('<span ng-models="time"><timepicker show-meridian="meridian"></timepicker></span>')($rootScope);
      $rootScope.$digest();

      expect($rootScope.time).toBe(null);
    });
  });

  describe('`meridians` attribute', function() {
    beforeEach(inject(function() {
      $rootScope.meridiansArray = ['am', 'pm'];
      element = $compile('<timepicker ng-models="time" meridians="meridiansArray"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));

    it('displays correctly', function () {
      expect(getTimeState()[2]).toBe('pm');
    });

    it('toggles correctly', function () {
      $rootScope.time = newTime(2, 40);
      $rootScope.$digest();
      expect(getTimeState()[2]).toBe('am');
    });
  });

  describe('`readonly-input` attribute', function() {
    beforeEach(inject(function() {
      $rootScope.meridiansArray = ['am', 'pm'];
      element = $compile('<timepicker ng-models="time" readonly-input="true"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));

    it('should make inputs readonly', function () {
      var inputs = element.find('input');
      expect(inputs.eq(0).attr('readonly')).toBe('readonly');
      expect(inputs.eq(1).attr('readonly')).toBe('readonly');
    });
  });

  describe('setting timepickerConfig steps', function() {
    var originalConfig = {};
    beforeEach(inject(function(_$compile_, _$rootScope_, timepickerConfig) {
      angular.extend(originalConfig, timepickerConfig);
      timepickerConfig.hourStep = 2;
      timepickerConfig.minuteStep = 10;
      timepickerConfig.showMeridian = false;
      element = $compile('<timepicker ng-models="time"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));
    afterEach(inject(function(timepickerConfig) {
      // return it to the original state
      angular.extend(timepickerConfig, originalConfig);
    }));

    it('does not affect the initial value', function () {
      expect(getTimeState(true)).toEqual(['14', '40']);
      expect(getModelState()).toEqual([14, 40]);
    });

    it('increases / decreases hours with configured step', function() {
      var up = getHoursButton(true);
      var down = getHoursButton(false);

      doClick(up, 2);
      expect(getTimeState(true)).toEqual(['18', '40']);
      expect(getModelState()).toEqual([18, 40]);

      doClick(down, 3);
      expect(getTimeState(true)).toEqual(['12', '40']);
      expect(getModelState()).toEqual([12, 40]);
    });

    it('increases / decreases minutes with configured step', function() {
      var up = getMinutesButton(true);
      var down = getMinutesButton(false);

      doClick(up);
      expect(getTimeState(true)).toEqual(['14', '50']);
      expect(getModelState()).toEqual([14, 50]);

      doClick(down, 3);
      expect(getTimeState(true)).toEqual(['14', '20']);
      expect(getModelState()).toEqual([14, 20]);
    });
  });

  describe('setting timepickerConfig meridian labels', function() {
    var originalConfig = {};
    beforeEach(inject(function(_$compile_, _$rootScope_, timepickerConfig) {
      angular.extend(originalConfig, timepickerConfig);
      timepickerConfig.meridians = ['π.μ.', 'μ.μ.'];
      timepickerConfig.showMeridian = true;
      element = $compile('<timepicker ng-models="time"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));
    afterEach(inject(function(timepickerConfig) {
      // return it to the original state
      angular.extend(timepickerConfig, originalConfig);
    }));

    it('displays correctly', function () {
      expect(getTimeState()).toEqual(['02', '40', 'μ.μ.']);
      expect(getModelState()).toEqual([14, 40]);
    });

    it('toggles correctly', function () {
      $rootScope.time = newTime(2, 40);
      $rootScope.$digest();

      expect(getTimeState()).toEqual(['02', '40', 'π.μ.']);
      expect(getModelState()).toEqual([2, 40]);
    });
  });

  describe('$formatter', function () {
    var ngModel,
      date;

    beforeEach(function () {
      ngModel = element.controller('ngModel');
      date = new Date('Mon Mar 23 2015 14:40:11 GMT-0700 (PDT)');
    });

    it('should have one formatter', function () {
      expect(ngModel.$formatters.length).toBe(1);
    });

    it('should convert a date to a new reference representing the same date', function () {
      expect(ngModel.$formatters[0](date)).toEqual(date);
    });

    it('should convert a valid date string to a date object', function () {
      expect(ngModel.$formatters[0]('Mon Mar 23 2015 14:40:11 GMT-0700 (PDT)')).toEqual(date);
    });

    it('should set falsy values as null', function () {
      expect(ngModel.$formatters[0](undefined)).toBe(null);
      expect(ngModel.$formatters[0](null)).toBe(null);
      expect(ngModel.$formatters[0]('')).toBe(null);
      expect(ngModel.$formatters[0](0)).toBe(null);
      expect(ngModel.$formatters[0](NaN)).toBe(null);
    });
  });

  describe('user input validation', function () {
    var changeInputValueTo;

    beforeEach(inject(function($sniffer) {
      changeInputValueTo = function (inputEl, value) {
        inputEl.val(value);
        inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
        $rootScope.$digest();
      };
    }));

    function getHoursInputEl() {
      return element.find('input').eq(0);
    }

    function getMinutesInputEl() {
      return element.find('input').eq(1);
    }

    it('has initially the correct time & meridian', function() {
      expect(getTimeState()).toEqual(['02', '40', 'PM']);
      expect(getModelState()).toEqual([14, 40]);
    });

    it('updates hours & pads on input change & pads on blur', function() {
      var el = getHoursInputEl();

      changeInputValueTo(el, 5);
      expect(getTimeState()).toEqual(['5', '40', 'PM']);
      expect(getModelState()).toEqual([17, 40]);

      el.blur();
      expect(getTimeState()).toEqual(['05', '40', 'PM']);
      expect(getModelState()).toEqual([17, 40]);
    });

    it('updates minutes & pads on input change & pads on blur', function() {
      var el = getMinutesInputEl();

      changeInputValueTo(el, 9);
      expect(getTimeState()).toEqual(['02', '9', 'PM']);
      expect(getModelState()).toEqual([14, 9]);

      el.blur();
      expect(getTimeState()).toEqual(['02', '09', 'PM']);
      expect(getModelState()).toEqual([14, 9]);
    });

    it('clears models when input hours is invalid & alerts the UI', function() {
      var el = getHoursInputEl();

      changeInputValueTo(el, 'pizza');
      expect($rootScope.time).toBe(null);
      expect(el.parent().hasClass('has-error')).toBe(true);
      expect(element.hasClass('ng-invalid-time')).toBe(true);

      changeInputValueTo(el, 8);
      el.blur();
      $rootScope.$digest();
      expect(getTimeState()).toEqual(['08', '40', 'PM']);
      expect(getModelState()).toEqual([20, 40]);
      expect(el.parent().hasClass('has-error')).toBe(false);
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });

    it('clears models when input minutes is invalid & alerts the UI', function() {
      var el = getMinutesInputEl();

      changeInputValueTo(el, 'pizza');
      expect($rootScope.time).toBe(null);
      expect(el.parent().hasClass('has-error')).toBe(true);
      expect(element.hasClass('ng-invalid-time')).toBe(true);

      changeInputValueTo(el, 22);
      expect(getTimeState()).toEqual(['02', '22', 'PM']);
      expect(getModelState()).toEqual([14, 22]);
      expect(el.parent().hasClass('has-error')).toBe(false);
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });

    it('handles 12/24H mode change', function() {
      $rootScope.meridian = true;
      element = $compile('<timepicker ng-models="time" show-meridian="meridian"></timepicker>')($rootScope);
      $rootScope.$digest();

      var el = getHoursInputEl();

      changeInputValueTo(el, '16');
      expect($rootScope.time).toBe(null);
      expect(el.parent().hasClass('has-error')).toBe(true);
      expect(element.hasClass('ng-invalid-time')).toBe(true);

      $rootScope.meridian = false;
      $rootScope.$digest();
      expect(getTimeState(true)).toEqual(['16', '40']);
      expect(getModelState()).toEqual([16, 40]);
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });
  });

  describe('when models is not a Date', function() {
    beforeEach(inject(function() {
      element = $compile('<timepicker ng-models="time"></timepicker>')($rootScope);
    }));

    it('should not be invalid when the models is null', function() {
      $rootScope.time = null;
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });

    it('should not be invalid when the models is undefined', function() {
      $rootScope.time = undefined;
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });

    it('should not be invalid when the models is a valid string date representation', function() {
      $rootScope.time = 'September 30, 2010 15:30:00';
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(false);
      expect(getTimeState()).toEqual(['03', '30', 'PM']);
    });

    it('should be invalid when the models is not a valid string date representation', function() {
      $rootScope.time = 'pizza';
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(true);
    });

    it('should return valid when the models becomes valid', function() {
      $rootScope.time = 'pizza';
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(true);

      $rootScope.time = new Date();
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });

    it('should return valid when the models is cleared', function() {
      $rootScope.time = 'pizza';
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(true);

      $rootScope.time = null;
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid-time')).toBe(false);
    });
  });

  describe('use with `ng-required` directive', function() {
    beforeEach(inject(function() {
      $rootScope.time = null;
      element = $compile('<timepicker ng-models="time" ng-required="true"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));

    it('should be invalid initially', function() {
      expect(element.hasClass('ng-invalid')).toBe(true);
    });

    it('should be valid if models has been specified', function() {
      $rootScope.time = new Date();
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid')).toBe(false);
    });
  });

  describe('use with `ng-change` directive', function() {
    beforeEach(inject(function() {
      $rootScope.changeHandler = jasmine.createSpy('changeHandler');
      $rootScope.time = new Date();
      element = $compile('<timepicker ng-models="time" ng-change="changeHandler()"></timepicker>')($rootScope);
      $rootScope.$digest();
    }));

    it('should not be called initially', function() {
      expect($rootScope.changeHandler).not.toHaveBeenCalled();
    });

    it('should be called when hours / minutes buttons clicked', function() {
      var btn1 = getHoursButton(true);
      var btn2 = getMinutesButton(false);

      doClick(btn1, 2);
      doClick(btn2, 3);
      $rootScope.$digest();
      expect($rootScope.changeHandler.calls.count()).toBe(5);
    });

    it('should not be called when models changes programatically', function() {
      $rootScope.time = new Date();
      $rootScope.$digest();
      expect($rootScope.changeHandler).not.toHaveBeenCalled();
    });
  });

});
