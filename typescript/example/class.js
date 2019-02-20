var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(gender, name) {
        this.specy = 'human';
        this.gender = gender;
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.staticProp = 'static';
    return Person;
}());
var Man = /** @class */ (function (_super) {
    __extends(Man, _super);
    function Man(name, pinusLength) {
        var _this = _super.call(this, 'male', name) || this;
        _this.pinusLength = pinusLength;
        return _this;
    }
    Man.prototype.toString = function () {
        return "Man: " + this.name + " - " + this.pinusLength;
    };
    return Man;
}(Person));
