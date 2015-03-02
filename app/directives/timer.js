(function() {
    'use strict';

    var timer = angular.module('opentele.directives.timer', [
        'opentele.translations'
    ]);

    timer.directive('timer', function($interval, $translate) {

        var link = function(scope, ele, attrs) {

            var interval = 1000; // hardcoded
            var stopTicking, stopWatching;

            var stopTimer = function(nodeModel) {
                nodeModel.count = (nodeModel.countUp === true) ? 0 : nodeModel.countTime;
                if (angular.isDefined(stopTicking)) {
                    $interval.cancel(stopTicking);
                    stopTicking = undefined;
                }
            };

            var nextNode = function(nodeModel) {
                stopTimer(nodeModel);
                if (scope.nodeModel !== undefined &&
                    scope.nodeModel.hasOwnProperty('onTimerStopped')) {
                    nodeModel.onTimerStopped(scope);
                }
            };

            var updateDescription = function(nodeModel) {
                var descriptionLeft = $translate.instant("DELAY_NODE_DESCRIPTION_LEFT_DOWN");
                var descriptionCenter = $translate.instant("DELAY_NODE_DESCRIPTION_CENTER");
                var descriptionRight = $translate.instant("DELAY_NODE_DESCRIPTION_RIGHT");
                if (nodeModel.countUp === true) {
                    descriptionLeft = $translate.instant("DELAY_NODE_DESCRIPTION_LEFT_UP");
                }
                nodeModel.timerDescription = descriptionLeft + " " +
                    nodeModel.count + " " + descriptionCenter + " " +
                    nodeModel.countTime + " " + descriptionRight;
            };

            var tick = function(nodeModel) {
                if (nodeModel.countUp === true) {
                    nodeModel.count++;
                    updateDescription(nodeModel);
                    if (nodeModel.count >= nodeModel.countTime) {
                        return nextNode(nodeModel);
                    }
                } else {
                    nodeModel.count--;
                    updateDescription(nodeModel);
                    if (nodeModel.count <= 0) {
                        return nextNode(nodeModel);
                    }
                }
            };

            stopWatching = scope.$watch(attrs.timer, function(newValue) {

                if (newValue === undefined) {
                    stopTimer(scope.nodeModel);
                    stopWatching();
                }

                var nodeModel = scope.nodeModel;
                updateDescription(nodeModel);
                var wrapTick = function() {
                    tick(nodeModel);
                };
                stopTicking = $interval(wrapTick, interval, nodeModel.countTime);

                var backListenerUnregister = scope.$on('backClick', function() {
                    stopTimer(scope.nodeModel);
                    backListenerUnregister();
                });

                var menuListenerUnregister = scope.$on('menuClick', function() {
                    stopTimer(scope.nodeModel);
                    menuListenerUnregister();
                });
            });

            scope.$on('destroy', function() {
                if (angular.isDefined(stopTicking)) {
                    $interval.cancel(stopTicking);
                    stopTicking = undefined;
                }
            });
        };

        return {
            link: link,
            restrict: 'A'
        };
    });

}());
