function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_lib2_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t0.list_1 = list;
  t0.i_2 = 0;
  this.forEach$1(new $.Closure11(t0));
  return t0.list_1;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._lib2_keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    var key = $.index(this._lib2_keys, i);
    var t0 = !(key === (void 0));
    if (t0) {
      var t1 = !(key === $.CTC13);
    } else {
      t1 = t0;
    }
    if (t1) {
      f.$call$2(key, $.index(this._values, i));
    } else {
    }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  } else {
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t0 = $.index(this._lib2_keys, index) === (void 0);
  if (!t0) {
    var t1 = $.index(this._lib2_keys, index) === $.CTC13;
  } else {
    t1 = t0;
  }
  if (t1) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  } else {
  }
  $.indexSet(this._lib2_keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._lib2_keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    $.indexSet(this._lib2_keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._lib2_keys);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._lib2_keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 1, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, oldKeys, capacity, oldValues);
  this._lib2_keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; $.ltB(i, capacity); i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    var t3 = t2 === (void 0);
    if (!t3) {
      var t4 = t2 === $.CTC13;
    } else {
      t4 = t3;
    }
    if (t4) {
      continue;
    } else {
    }
    var t5 = oldValues.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t6 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._lib2_keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t6);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      oldKeys = env1;
      break;
    case 2:
      oldKeys = env0;
      capacity = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._lib2_keys);
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._lib2_keys;
    case 1:
      state = 0;
      var oldValues = this._values;
    case 2:
      state = 0;
      this._lib2_keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          var t1 = key === (void 0);
          if (!t1) {
            var t2 = key === $.CTC13;
          } else {
            t2 = t1;
          }
          if (t2) {
            break c$0;
          } else {
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._lib2_keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._lib2_keys), 2));
    return;
  } else {
  }
  var numberOfFree = $.sub($.sub($.get$length(this._lib2_keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._lib2_keys));
  } else {
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib2_keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var existingKey = $.index(this._lib2_keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    } else {
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    } else {
      var numberOfProbes1 = numberOfProbes + 1;
    }
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._lib2_keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib2_keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var existingKey = $.index(this._lib2_keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      } else {
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        var t0 = $.ltB(insertionIndex, 0);
        if (t0) {
          var t1 = $.CTC13 === existingKey;
        } else {
          t1 = t0;
        }
        if (t1) {
          var insertionIndex0 = hash0;
        } else {
          insertionIndex0 = insertionIndex;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib2_keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib2_keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._lib2_keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          } else {
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            var t0 = $.ltB(insertionIndex, 0);
            if (t0) {
              var t1 = $.CTC13 === existingKey;
            } else {
              t1 = t0;
            }
            if (t1) {
              var insertionIndex0 = hash0;
            } else {
              insertionIndex0 = insertionIndex;
            }
            var numberOfProbes0 = numberOfProbes + 1;
          }
        }
        var hash1 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib2_keys));
        var numberOfProbes1 = numberOfProbes0;
        var hash2 = hash1;
        numberOfProbes = numberOfProbes1;
        hash0 = hash2;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._lib2_keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._backingMap, new $.Closure14(t0));
  return t0.result_2;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure13(t0));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure12(this));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    } else {
    }
    entry = $.index(this._entries, this._nextValidIndex);
    var t1 = entry === (void 0);
    if (!t1) {
      var t2 = entry === $.CTC13;
    } else {
      t2 = t1;
    }
  } while (t2);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  } else {
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC13) {
    this._advance$0();
  } else {
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  } else {
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  } else {
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  var t0 = str === (void 0);
  if (!t0) {
    var t1 = $.isEmpty(str) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return this;
  } else {
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  } else {
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    } else {
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("DateImplementation", "Object", ["_isUtc", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.isUtc$0());
 },
 toString$0: function() {
  var t0 = new $.Closure8();
  var t1 = new $.Closure9();
  var t2 = new $.Closure10();
  var y = t0.$call$1(this.get$year());
  var m = t2.$call$1(this.get$month());
  var d = t2.$call$1(this.get$day());
  var h = t2.$call$1(this.get$hours());
  var min = t2.$call$1(this.get$minutes());
  var sec = t2.$call$1(this.get$seconds());
  var ms = t1.$call$1(this.get$milliseconds());
  if (this.isUtc$0() === true) {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms) + 'Z';
  } else {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms);
  }
 },
 isUtc$0: function() {
  return this._isUtc;
 },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$le$1: function(other) {
  return $.le(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  } else {
  }
  return $.eq(this.value, other.value);
 },
 DateImplementation$8: function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  this._asJs$0();
 },
 is$DateImplementation: true
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  } else {
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure18", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("ConstantMap", "Object", ["_keys?", "_jsObject", "length?"], {
 clear$0: function() {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC9);
 },
 toString$0: function() {
  return $.mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var t0 = ({});
  t0.result_1 = [];
  $.forEach(this._keys, new $.Closure7(this, t0));
  return t0.result_1;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._keys, new $.Closure6(this, t0));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) {
    return;
  } else {
  }
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) {
    return false;
  } else {
  }
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib3_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  } else {
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("IllegalAccessException", "Object", [], {
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    } else {
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      } else {
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("AssertionError", "Object", [], {
});

Isolate.$defineClass("TypeError", "AssertionError", ["msg"], {
 toString$0: function() {
  return this.msg;
 }
});

Isolate.$defineClass("Expense", "Object", ["isClaimed", "detail?", "amount?", "date?", "type?", "_id"], {
 get$id: function() {
  return this._id;
 },
 Expense$0: function() {
  this._id = $._getNextId();
 }
});

Isolate.$defineClass("ExpenseType", "Object", ["code?", "name?"], {
 operator$eq$1: function(other) {
  if ($.eqNullB(other)) {
    return false;
  } else {
  }
  var t0 = $.eqB(this.name, other.get$name());
  if (t0) {
    var t1 = $.eqB(this.code, other.get$code());
  } else {
    t1 = t0;
  }
  return t1;
 },
 toString$0: function() {
  return '' + $.stringToString($.Object.prototype.toString$0.call(this)) + ': ' + $.stringToString(this.name) + ', ' + $.stringToString(this.code);
 }
});

Isolate.$defineClass("App", "Object", ["uiRoot"], {
 _updateContent$1: function(view) {
  $.removeLast(this.uiRoot.query$1('#content').get$elements());
  $.add$1(this.uiRoot.query$1('#content').get$elements(), view);
 },
 run$0: function() {
  $.buildBaseUi(this.uiRoot);
  $.expenseTypes = $.loadExpenseTypes($.getMockExpenseTypes);
  $.expenses = $.loadExpenses($.getMockExpenses);
  this._updateContent$1($.editExpense($.index($.expenses, 1)));
 }
});

Isolate.$defineClass("FilteredElementList", "Object", ["_childNodes", "_node"], {
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    result.remove$0();
  } else {
  }
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure4());
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.Closure19(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) {
    return;
  } else {
    if ($.ltB(newLength, 0)) {
      throw $.captureStackTrace($.CTC4);
    } else {
    }
  }
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t0 = $.iterator(this._childNodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (typeof t1 === 'object' && t1.is$Element()) {
      return t1;
    } else {
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure2()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ChildrenElementList", "Object", ["_childElements", "_element"], {
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._element.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 clear$0: function() {
  this._element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._element.$dom_appendChild$1(t1);
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC3);
 },
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._element.get$$$dom_firstElementChild());
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure3(t0, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t0 = $.iterator(this._childElements); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var output = $.List($.get$length(this._childElements));
  for (var len = $.get$length(this._childElements), i = 0; $.ltB(i, len); i = i + 1) {
    var t0 = $.index(this._childElements, i);
    var t1 = output.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    output[i] = t0;
  }
  return output;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementList", "Object", ["_nodeList"], {
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC3);
 },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      out.add$1(t1);
    } else {
    }
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementListIterator", "Object", ["_lib_index", "_list"], {
 hasNext$0: function() {
  return $.lt(this._lib_index, $.get$length(this._list));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._list;
  var t1 = this._lib_index;
  this._lib_index = $.add(t1, 1);
  return $.index(t0, t1);
 }
});

Isolate.$defineClass("_ElementList", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ElementAttributeMap", "Object", ["_element"], {
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.getValues$0$bailout(1, attributes);
  var values = $.List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i].get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    values[i] = t1;
  }
  return values;
 },
 getValues$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var values = $.List($.get$length(attributes));
      $.setRuntimeTypeInfo(values, ({E: 'String'}));
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t0 = $.index(attributes, i).get$value();
        var t1 = values.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        values[i] = t0;
        i = i + 1;
      }
      return values;
  }
 },
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.forEach$1$bailout(f, 1, attributes);
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i];
    f.$call$2(t1.get$name(), t1.get$value());
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var item = $.index(attributes, i);
        f.$call$2(item.get$name(), item.get$value());
        i = i + 1;
      }
  }
 },
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; i = i - 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var i = $.sub($.get$length(attributes), 1);
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        this.remove$1($.index(attributes, i).get$name());
        i = $.sub(i, 1);
      }
  }
 },
 remove$1: function(key) {
  var value = this._element.$dom_getAttribute$1(key);
  this._element.$dom_removeAttribute$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, '' + $.stringToString(value));
 },
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("_CssClassSet", "Object", ["_element"], {
 _formatSet$1: function(s) {
  return $.join($.List$from(s), ' ');
 },
 _write$1: function(s) {
  var t0 = this._formatSet$1(s);
  this._element.set$$$dom_className(t0);
 },
 _classname$0: function() {
  return this._element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t0 = $.iterator($.split(this._classname$0(), ' ')); t0.hasNext$0() === true; ) {
    var trimmed = $.trim(t0.next$0());
    if ($.isEmpty(trimmed) !== true) {
      s.add$1(trimmed);
    } else {
    }
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $.Closure17());
 },
 addAll$1: function(collection) {
  var t0 = ({});
  t0.collection_1 = collection;
  this._modify$1(new $.Closure16(t0));
 },
 add$1: function(value) {
  var t0 = ({});
  t0.value_1 = value;
  this._modify$1(new $.Closure15(t0));
 },
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
 },
 get$length: function() {
  return $.get$length(this._read$0());
 },
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
 },
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
 },
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
 },
 iterator$0: function() {
  return $.iterator(this._read$0());
 },
 toString$0: function() {
  return this._formatSet$1(this._read$0());
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._this.$dom_appendChild$1(t1);
  }
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 get$first: function() {
  return $.index(this._list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._list);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_AttributeClassSet", "_CssClassSet", ["_element"], {
 _write$1: function(s) {
  $.indexSet(this._element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.Closure20(this, '$dom_className$0'); }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("Closure", "Closure18", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  } else {
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure2", "Closure18", [], {
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
});

Isolate.$defineClass("Closure3", "Closure18", ["box_0", "output_2"], {
 $call$1: function(element) {
  if (this.box_0.f_1.$call$1(element) === true) {
    $.add$1(this.output_2, element);
  } else {
  }
 }
});

Isolate.$defineClass("Closure4", "Closure18", [], {
 $call$1: function(el) {
  return el.remove$0();
 }
});

Isolate.$defineClass("Closure5", "Closure18", ["values_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
});

Isolate.$defineClass("Closure6", "Closure18", ["this_2", "box_0"], {
 $call$1: function(key) {
  return this.box_0.f_1.$call$2(key, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure7", "Closure18", ["this_2", "box_0"], {
 $call$1: function(key) {
  return $.add$1(this.box_0.result_1, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure8", "Closure18", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(absN, 100)) {
    return '' + $.stringToString(sign) + '0' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 10)) {
    return '' + $.stringToString(sign) + '00' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 1)) {
    return '' + $.stringToString(sign) + '000' + $.stringToString(absN);
  } else {
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure9", "Closure18", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(n, 10)) {
    return '0' + $.stringToString(n);
  } else {
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure10", "Closure18", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  } else {
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure11", "Closure18", ["box_0"], {
 $call$2: function(key, value) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.i_2;
  var i = $.add(t1, 1);
  this.box_0.i_2 = i;
  $.indexSet(t0, t1, value);
 }
});

Isolate.$defineClass("Closure12", "Closure18", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
});

Isolate.$defineClass("Closure13", "Closure18", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure14", "Closure18", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  } else {
  }
 }
});

Isolate.$defineClass("Closure15", "Closure18", ["box_0"], {
 $call$1: function(s) {
  return $.add$1(s, this.box_0.value_1);
 }
});

Isolate.$defineClass("Closure16", "Closure18", ["box_0"], {
 $call$1: function(s) {
  return $.addAll(s, this.box_0.collection_1);
 }
});

Isolate.$defineClass("Closure17", "Closure18", [], {
 $call$1: function(s) {
  return $.clear(s);
 }
});

Isolate.$defineClass('Closure19', 'Closure18', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
Isolate.$defineClass('Closure20', 'Closure18', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  } else {
  }
  return a.operator$mul$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  } else {
  }
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  } else {
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.getMockExpenses = function() {
  var expenses = $.List((void 0));
  $.setRuntimeTypeInfo(expenses, ({E: 'Expense'}));
  var expense = $.Expense$0();
  expense.type = $.CTC10;
  expense.amount = 50.0;
  expense.detail = 'Taxi from airport';
  expense.date = $.DateImplementation$8(2012, 6, 5, 10, 15, 55, 100, false);
  expense.isClaimed = false;
  expenses.push(expense);
  var expense0 = $.Expense$0();
  expense0.type = $.CTC11;
  expense0.amount = 40.0;
  expense0.detail = 'Dart in Action';
  expense0.date = $.DateImplementation$8(2012, 6, 5, 10, 15, 55, 100, false);
  expense0.isClaimed = false;
  expenses.push(expense0);
  var expense1 = $.Expense$0();
  expense1.type = $.CTC12;
  expense1.amount = 150.0;
  expense1.detail = 'City Hotel';
  expense1.date = $.DateImplementation$8(2012, 6, 5, 10, 15, 55, 100, false);
  expense1.isClaimed = false;
  expenses.push(expense1);
  var expense2 = $.Expense$0();
  expense2.type = $.CTC10;
  expense2.amount = 55.0;
  expense2.detail = 'Taxi to Airport';
  expense2.date = $.DateImplementation$8(2012, 6, 5, 10, 15, 55, 100, false);
  expense2.isClaimed = false;
  expenses.push(expense2);
  return expenses;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    } else {
    }
  }
  return false;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    } else {
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        var startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  } else {
  }
  return a.operator$le$1(b);
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$._ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.isJsArray = function(value) {
  var t0 = !(value === (void 0));
  if (t0) {
    var t1 = (value.constructor === Array);
  } else {
    t1 = t0;
  }
  return t1;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    var t0 = index < 0;
    if (!t0) {
      var t1 = $.geB(index, $.get$length(a));
    } else {
      t1 = t0;
    }
    if (t1) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  } else {
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  } else {
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$._getOptions = function(selectedExpenseType) {
  var result = $.StringBufferImpl$1('');
  result.add$1('<option value=\'\'>&nbsp</option>');
  for (var t0 = $.iterator($.expenseTypes.getValues$0()); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if ($.eqB(t1, selectedExpenseType)) {
      result.add$1('<option value=\'' + $.stringToString(t1.get$code()) + '\' selected=\'selected\'>' + $.stringToString(t1.get$name()) + '</option>');
    } else {
      result.add$1('<option value=\'' + $.stringToString(t1.get$code()) + '\'>' + $.stringToString(t1.get$name()) + '</option>');
    }
  }
  return result.toString$0();
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  } else {
  }
  return a.operator$ge$1(b);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  } else {
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  } else {
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.getMilliseconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t0;
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    var t0 = (typeof(name$)) === 'string';
    if (t0) {
      var t1 = $.isEmpty(name$) !== true;
    } else {
      t1 = t0;
    }
    if (t1) {
      var t2 = !(name$ === 'Object');
    } else {
      t2 = t1;
    }
    if (t2) {
      return name$;
    } else {
    }
  } else {
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.ltB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b) === true;
  }
  return t2;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    } else {
    }
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  } else {
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  } else {
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  } else {
  }
  return name$;
};

$.getMockExpenseTypes = function() {
  var expenseTypes = $.HashMapImplementation$0();
  expenseTypes.operator$indexSet$2('TRV', $.CTC10);
  expenseTypes.operator$indexSet$2('BK', $.CTC11);
  expenseTypes.operator$indexSet$2('HT', $.CTC12);
  return expenseTypes;
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  } else {
  }
  $.set$length(receiver, 0);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  } else {
  }
  return a.operator$tdiv$1(b);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  } else {
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  } else {
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  } else {
  }
  return name$;
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    var result0 = result + t1;
  }
  return result;
};

$.editExpense = function(expenses) {
  return $.Element$html('<div class="expense" id="expense' + $.stringToString(expenses.get$id()) + '">\r\n  <label for="expenseTypes">Type</label><select id="expenseTypes">\r\n    ' + $.stringToString($._getOptions(expenses.get$type())) + '\r\n  </select><br/>\r\n  <label for="expenseDate">Date</label>\r\n    ' + $.stringToString($._getDate(expenses.get$date())) + '<br/>\r\n  <label for="expenseAmount">Amount</label>\r\n    ' + $.stringToString($._getAmount(expenses.get$amount())) + '</br>\r\n  <label for="expenseDetail">Detail</label>\r\n    ' + $.stringToString($._getDetail(expenses.get$detail())) + '\r\n</div>\r\n    ');
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  } else {
  }
  if (0 === length$) {
    return [];
  } else {
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  } else {
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  } else {
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  return receiver.slice(start, end);
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  } else {
  }
  if ($.ltB(start, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = $.add(start, length$);
  if ($.gtB(end, a.length)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  } else {
  }
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  } else {
  }
  return $dynamicMetadata;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    var t0 = a0 > 0;
    var t1 = b0 > 31;
    if (t0) {
      if (t1) {
        return 0;
      } else {
      }
      return a0 >>> b0;
    } else {
    }
    if (t1) {
      var b1 = 31;
    } else {
      b1 = b0;
    }
    return (a0 >> b1) >>> 0;
  } else {
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  if (r === (void 0)) {
    var r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  } else {
    r0 = r;
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  } else {
  }
  return object;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  } else {
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  } else {
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex0 = length$;
  } else {
    endIndex0 = endIndex;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  } else {
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      a[key] = value;
      return;
    } else {
    }
  } else {
  }
  $.indexSet$slow(a, index, value);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$._blankIfNull = function(o) {
  if ($.eqNullB(o)) {
    return '';
  } else {
    return o;
  }
};

$.gt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b);
  }
  return t2;
};

$.assert = function(condition) {
};

$.getSeconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t0;
};

$.TypeError$1 = function(msg) {
  return new $.TypeError(msg);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$._getDate = function(expenseDate) {
  return '<date id="expenseDate">' + $.stringToString($._blankIfNull(expenseDate)) + '</date>';
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  } else {
  }
  return false;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  } else {
  }
  return $.contains$2(receiver, other, 0);
};

$.getHours = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t0;
};

$.mul = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a * b);
  } else {
    t2 = $.mul$slow(a, b);
  }
  return t2;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return res;
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.last$0();
  } else {
  }
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._ElementAttributeMap$1 = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  } else {
  }
  return a.operator$lt$1(b);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  } else {
  }
  return $._cachedBrowserPrefix;
};

$.index$slow = function(a, index) {
  var t0 = typeof a === 'string';
  if (!t0) {
    var t1 = $.isJsArray(a) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
    } else {
    }
    var t2 = $.ltB(index, 0);
    if (!t2) {
      var t3 = $.geB(index, $.get$length(a));
    } else {
      t3 = t2;
    }
    if (t3) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return a[index];
  } else {
  }
  return a.operator$index$1(index);
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    } else {
    }
    $._emitObject(t2, result, visiting);
    var first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  } else {
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._getDetail = function(detail) {
  return '<textarea id="expenseDetail">' + $.stringToString($._blankIfNull(detail)) + '</textarea>';
};

$._ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  } else {
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$.filter2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$._getAmount = function(amount) {
  return '<number id="expenseAmount">' + $.stringToString($._blankIfNull(amount)) + '</number>';
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._AttributeClassSet$1 = function(element) {
  return new $._AttributeClassSet(element);
};

$.getDay = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t0;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.DateImplementation$fromEpoch$2 = function(value, isUtc) {
  return new $.DateImplementation($.checkNull(isUtc), value);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  } else {
  }
  return receiver.iterator$0();
};

$.loadExpenseTypes = function(dataSource) {
  return dataSource.$call$0();
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.loadExpenses = function(dataSource) {
  return dataSource.$call$0();
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$.Expense$0 = function() {
  var t0 = new $.Expense(false, (void 0), 0, (void 0), (void 0), (void 0));
  t0.Expense$0();
  return t0;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  } else {
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  } else {
  }
  return result;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  } else {
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.add = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a + b);
  } else {
    t2 = $.add$slow(a, b);
  }
  return t2;
};

$.geB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b) === true;
  }
  return t2;
};

$.getMonth = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t0;
};

$.DateImplementation$8 = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  var t0 = new $.DateImplementation($.checkNull(isUtc), $.valueFromDecomposedDate(years, month, day, hours, minutes, seconds, milliseconds, isUtc));
  t0.DateImplementation$8(years, month, day, hours, minutes, seconds, milliseconds, isUtc);
  return t0;
};

$.getMinutes = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t0;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.checkInt = function(value) {
  if (!((typeof value === 'number') && (value === (value | 0)))) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  var t0 = !(f === (void 0));
  if (t0) {
    var t1 = (!!f.methods);
  } else {
    t1 = t0;
  }
  if (t1) {
    return f.methods;
  } else {
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC16)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  } else {
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  if ($.charCodeAt(name$, 0) === 36) {
    var name0 = $.substring$1(name$, 1);
  } else {
    name0 = name$;
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  } else {
  }
  return Math.abs(receiver);
};

$.checkBool = function(value) {
  if (!(typeof value === 'boolean')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.App$0 = function() {
  return new $.App($.document().get$body().query$1('#dartexpense'));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    } else {
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    } else {
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b) === true;
  }
  return t2;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  } else {
  }
  return a.operator$gt$1(b);
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.regExpMakeNative = function(regExp, global) {
  var t0 = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(t0);
  var t1 = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(t1, 'm');
  } else {
  }
  if (ignoreCase === true) {
    $.add$1(t1, 'i');
  } else {
  }
  if (global === true) {
    $.add$1(t1, 'g');
  } else {
  }
  try {
    return new RegExp(t0, $.toString(t1));
  } catch (t2) {
    var t3 = $.unwrapException(t2);
    var t4 = t3;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(t0, (String(t4))));
  }
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  } else {
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  } else {
  }
  var length$ = (receiver.length);
  for (var i = 0, hash = 0; i < length$; i = i0, hash = hash0) {
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    var hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  } else {
  }
  return receiver.date;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  } else {
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  } else {
  }
  return other == receiver.substring(0, length$);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$.le = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b);
  }
  return t2;
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.trim$0();
  } else {
  }
  return receiver.trim();
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  } else {
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  } else {
  }
  return name$;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var t0 = method === (void 0);
  if (t0) {
    var t1 = !($._dynamicMetadata2() === (void 0));
  } else {
    t1 = t0;
  }
  if (t1) {
    for (var method0 = method, i = 0; method1 = method0, $.ltB(i, $.get$length($._dynamicMetadata2())); method0 = method2, i = i0) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method1 = method3;
          break;
        } else {
        }
        var method2 = method3;
      } else {
        method2 = method0;
      }
      var i0 = i + 1;
    }
  } else {
    method1 = method;
  }
  if (method1 === (void 0)) {
    var method4 = (methods['Object']);
  } else {
    method4 = method1;
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method4 === (void 0)) {
    var method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  } else {
    method5 = method4;
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  } else {
  }
  return nullCheckMethod.apply(obj, arguments$);
  var method1;
};

$.ge = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b);
  }
  return t2;
};

$.buildBaseUi = function(rootElement) {
  var header = $.Element$tag('header');
  header.set$innerHTML('DartExpense');
  $.add$1(rootElement.get$elements(), header);
  var content$ = $.Element$tag('div');
  content$.set$id('content');
  $.add$1(content$.get$classes(), 'content');
  $.add$1(rootElement.get$elements(), content$);
  var footer = $.Element$tag('footer');
  footer.set$innerHTML('Offline');
  $.add$1(rootElement.get$elements(), footer);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  } else {
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC15) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    } else {
    }
    return receiver.pop();
  } else {
  }
  return receiver.removeLast$0();
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      return a[key];
    } else {
    }
  } else {
  }
  return $.index$slow(a, index);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  } else {
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  } else {
  }
  if (value === (void 0)) {
    return 'null';
  } else {
  }
  if (typeof value == "function") {
    return 'Closure';
  } else {
  }
  return String(value);
};

$.patchUpY2K = function(value, years, isUtc) {
  var t0 = isUtc === true;
  var date = (new Date(value));
  if (t0) {
    date.setUTCFullYear(years);
  } else {
    date.setFullYear(years);
  }
  return date.valueOf();
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  } else {
  }
  return receiver.toLowerCase();
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._CssClassSet$1 = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    } else {
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      } else {
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      } else {
      }
      if (start < 0) {
        return -1;
      } else {
      }
      return receiver.indexOf(element, start);
    } else {
    }
  }
  return receiver.indexOf$2(element, start);
};

$.Element$html = function(html) {
  var match = $.CTC6.firstMatch$1(html);
  if (!(match === (void 0))) {
    var tag = $.toLowerCase(match.group$1(1));
    if ($.CTC8.containsKey$1(tag) === true) {
      var parentTag = $.CTC8.operator$index$1(tag);
    } else {
      parentTag = 'div';
    }
    var tag0 = tag;
  } else {
    tag0 = (void 0);
    parentTag = 'div';
  }
  var temp = $.Element$tag(parentTag);
  temp.set$innerHTML(html);
  if ($.eqB($.get$length(temp.get$elements()), 1)) {
    var element = temp.get$elements().get$first();
  } else {
    var t0 = $.eqB(parentTag, 'html');
    if (t0) {
      var t1 = $.eqB($.get$length(temp.get$elements()), 2);
    } else {
      t1 = t0;
    }
    if (t1) {
      var t2 = temp.get$elements();
      if ($.eqB(tag0, 'head')) {
        var t3 = 0;
      } else {
        t3 = 1;
      }
    } else {
      throw $.captureStackTrace($.IllegalArgumentException$1('HTML had ' + $.stringToString($.get$length(temp.get$elements())) + ' ' + 'top level elements but 1 expected'));
    }
    element = $.index(t2, t3);
  }
  element.remove$0();
  return element;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  } else {
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator,  0);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t0 = $.iterator(strings), result = '', first = true; t0.hasNext$0() === true; result = result0, first = first0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    if (!first) {
      var result1 = result + separator;
    } else {
      result1 = result;
    }
    var result2 = result1 + t1;
    var first0 = false;
    var result0 = result2;
  }
  return result;
};

$.isEmpty = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length === 0;
  } else {
  }
  return receiver.isEmpty$0();
};

$.gtB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b) === true;
  }
  return t2;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  } else {
  }
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._getNextId = function() {
  var t0 = $._nextIdValue;
  $._nextIdValue = $.add(t0, 1);
  return t0;
};

$.valueFromDecomposedDate = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  $.checkInt(years);
  $.checkInt(month);
  var t0 = $.ltB(month, 1);
  if (!t0) {
    var t1 = $.ltB(12, month);
  } else {
    t1 = t0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(month));
  } else {
  }
  $.checkInt(day);
  var t2 = $.ltB(day, 1);
  if (!t2) {
    var t3 = $.ltB(31, day);
  } else {
    t3 = t2;
  }
  if (t3) {
    throw $.captureStackTrace($.IllegalArgumentException$1(day));
  } else {
  }
  $.checkInt(hours);
  var t4 = $.ltB(hours, 0);
  if (!t4) {
    var t5 = $.ltB(24, hours);
  } else {
    t5 = t4;
  }
  if (t5) {
    throw $.captureStackTrace($.IllegalArgumentException$1(hours));
  } else {
  }
  $.checkInt(minutes);
  var t6 = $.ltB(minutes, 0);
  if (!t6) {
    var t7 = $.ltB(59, minutes);
  } else {
    t7 = t6;
  }
  if (t7) {
    throw $.captureStackTrace($.IllegalArgumentException$1(minutes));
  } else {
  }
  $.checkInt(seconds);
  var t8 = $.ltB(seconds, 0);
  if (!t8) {
    var t9 = $.ltB(59, seconds);
  } else {
    t9 = t8;
  }
  if (t9) {
    throw $.captureStackTrace($.IllegalArgumentException$1(seconds));
  } else {
  }
  $.checkInt(milliseconds);
  var t10 = $.ltB(milliseconds, 0);
  if (!t10) {
    var t11 = $.ltB(999, milliseconds);
  } else {
    t11 = t10;
  }
  if (t11) {
    throw $.captureStackTrace($.IllegalArgumentException$1(milliseconds));
  } else {
    var t12 = isUtc === true;
  }
  $.checkBool(isUtc);
  var jsMonth = $.sub(month, 1);
  if (t12) {
    var value = (Date.UTC(years, jsMonth, day, hours, minutes, seconds, milliseconds));
  } else {
    value = (new Date(years, jsMonth, day, hours, minutes, seconds, milliseconds).valueOf());
  }
  if ($.isNaN(value) === true) {
    throw $.captureStackTrace($.IllegalArgumentException$1(''));
  } else {
  }
  var t13 = $.leB(years, 0);
  if (!t13) {
    var t14 = $.ltB(years, 100);
  } else {
    t14 = t13;
  }
  if (t14) {
    return $.patchUpY2K(value, years, isUtc);
  } else {
  }
  return value;
};

$.document = function() {
  return document;;
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      } else {
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
  }
  return a.operator$add$1(b);
};

$.getYear = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t0;
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  } else {
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    var t2 = length$ < 0;
  } else {
    t2 = t1;
  }
  if (t2) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.lt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b);
  }
  return t2;
};

$.main = function() {
  $.App$0().run$0();
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    var t0 = $.eqB(type, 'property_not_function');
    if (!t0) {
      var t1 = $.eqB(type, 'called_non_callable');
    } else {
      t1 = t0;
    }
    if (!t1) {
      var t2 = $.eqB(type, 'non_object_property_call');
    } else {
      t2 = t1;
    }
    if (!t2) {
      var t3 = $.eqB(type, 'non_object_property_load');
    } else {
      t3 = t2;
    }
    if (t3) {
      var t4 = typeof name$ === 'string';
      if (t4) {
        var t5 = $.startsWith(name$, '$call$') === true;
      } else {
        t5 = t4;
      }
      if (t5) {
        return $.ObjectNotClosureException$0();
      } else {
        return $.NullPointerException$2((void 0), $.CTC);
      }
    } else {
      if ($.eqB(type, 'undefined_method')) {
        var t6 = typeof name$ === 'string';
        if (t6) {
          var t7 = $.startsWith(name$, '$call$') === true;
        } else {
          t7 = t6;
        }
        if (t7) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NoSuchMethodException$4('', name$, [], (void 0));
        }
      } else {
      }
    }
    if (typeof message === 'string') {
      var t8 = $.endsWith(message, 'is null') === true;
      if (!t8) {
        var t9 = $.endsWith(message, 'is undefined') === true;
      } else {
        t9 = t8;
      }
      if (!t9) {
        var t10 = $.endsWith(message, 'is null or undefined') === true;
      } else {
        t10 = t9;
      }
      if (t10) {
        return $.NullPointerException$2((void 0), $.CTC);
      } else {
        if ($.endsWith(message, 'is not a function') === true) {
          return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
        } else {
        }
      }
    } else {
    }
    if (typeof message === 'string') {
      var t11 = message;
    } else {
      t11 = '';
    }
    return $.TypeError$1(t11);
  } else {
  }
  if (ex instanceof RangeError) {
    var t12 = typeof message === 'string';
    if (t12) {
      var t13 = $.contains$1(message, 'call stack') === true;
    } else {
      t13 = t12;
    }
    if (t13) {
      return $.StackOverflowException$0();
    } else {
    }
    return $.IllegalArgumentException$1('');
  } else {
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    var t14 = typeof message === 'string';
    if (t14) {
      var t15 = message === 'too much recursion';
    } else {
      t15 = t14;
    }
    if (t15) {
      return $.StackOverflowException$0();
    } else {
    }
  } else {
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  } else {
  }
  return Math.ceil(receiver);
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_lib2_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  } else {
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.sub = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a - b);
  } else {
    t2 = $.sub$slow(a, b);
  }
  return t2;
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      } else {
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      } else {
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      } else {
      }
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.add(i, 1);
      }
      return accumulator;
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        } else {
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            var startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var result = '';
      var first = true;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        } else {
        }
        if (!first) {
          var result0 = $.add(result, separator);
        } else {
          result0 = result;
        }
        var result1 = result0 + t2;
        var first0 = false;
        var result2 = result1;
        result = result2;
        first = first0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      result = env0;
      t0 = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.getMockExpenses.$call$0 = $.getMockExpenses;
$.getMockExpenseTypes.$call$0 = $.getMockExpenseTypes;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC3 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC14 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC7 = Isolate.makeConstantList(['body', 'head', 'caption', 'td', 'colgroup', 'col', 'tr', 'tbody', 'tfoot', 'thead', 'track']);
$.CTC8 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC7, {'body': 'html', 'head': 'html', 'caption': 'table', 'td': 'tr', 'colgroup': 'table', 'col': 'colgroup', 'tr': 'tbody', 'tbody': 'table', 'tfoot': 'table', 'thead': 'table', 'track': 'audio'}, 11);
$.CTC13 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC12 = new Isolate.$isolateProperties.ExpenseType('HT', 'Hotel');
$.CTC15 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC16 = new Isolate.$isolateProperties.Object();
$.CTC11 = new Isolate.$isolateProperties.ExpenseType('BK', 'Books');
$.CTC10 = new Isolate.$isolateProperties.ExpenseType('TRV', 'Travel');
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '<(\\w+)');
$.CTC4 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC9 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC5 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$._cachedBrowserPrefix = (void 0);
$.expenseTypes = (void 0);
$.expenses = (void 0);
$._nextIdValue = 1;
$._getTypeNameOf = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('HTMLAnchorElement', ["type?", "name?"], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?", "code?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value?", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value?", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value?", "type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$filter: function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CloseEvent', ["code?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.group$1 = function(arg) {
  return this.group(arg);
 };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CustomEvent', ["detail?"], {
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value?"], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC5.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  } else {
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('ID can\'t be set for document fragments.'));
 },
 get$classes: function() {
  var t0 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  return t0;
 },
 get$attributes: function() {
  return $.CTC14;
 },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) {
    this._elements = $.FilteredElementList$1(this);
  } else {
  }
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["innerHTML!", "id="], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
 },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 set$$$dom_className: function(value) {
  this.className = value;;
 },
 get$$$dom_className: function() {
  return this.className;;
 },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$1(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 get$attributes: function() {
  return $._ElementAttributeMap$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileError', ["code?"], {
});

$.$defineNativeClass('FileException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value?", "type?", "pattern?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaError', ["code?"], {
});

$.$defineNativeClass('MediaKeyError', ["code?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('NavigatorUserMediaError', ["code?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 get$$$dom_attributes: function() {
  return this.attributes;;
 },
 replaceWith$1: function(otherNode) {
  try {
    var t0 = this.get$parent();
    t0.$dom_replaceChild$2(otherNode, this);
  } catch (t1) {
    $.unwrapException(t1);
  }
  return this;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  } else {
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._parent.$dom_appendChild$1(t1);
  }
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["type?", "name?", "code?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OperationNotAllowedException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value?", "type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value?", "type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('PositionError', ["code?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value?"], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLError', ["code?"], {
});

$.$defineNativeClass('SQLException', ["code?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value?"], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.stringToString(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 get$classes: function() {
  if (this.get$_cssClassSet() === (void 0)) {
    this.set$_cssClassSet($._AttributeClassSet$1(this.get$_ptr()));
  } else {
  }
  return this.get$_cssClassSet();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value?"], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value?"], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value?", "type?", "name?", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionError', ["code?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $.Closure5(values));
  return values;
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    } else {
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value?", "type?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id="], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["detail?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?", "name?"], {
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XPathException', ["name?", "code?"], {
 toString$0: function() {
  return this.toString();
 }
});

// 282 dynamic classes.
// 339 classes
// 28 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v8/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['UIEvent', v7/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v7/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['Node', [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
