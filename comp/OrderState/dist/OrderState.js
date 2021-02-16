"use strict";
exports.__esModule = true;
var react_1 = require("react");
var style_module_css_1 = require("./style.module.css");
var OrderState = function (props) {
    var _a;
    return (react_1["default"].createElement("div", { className: style_module_css_1["default"].orderState },
        react_1["default"].createElement("ul", { className: style_module_css_1["default"].states }, (_a = props.states) === null || _a === void 0 ? void 0 : _a.map(function (o, idx) { return (react_1["default"].createElement("li", { key: idx, className: o.state === props.active ? style_module_css_1["default"].active : '' },
            react_1["default"].createElement("span", null, o.label || o.state))); }))));
};
exports["default"] = OrderState;
