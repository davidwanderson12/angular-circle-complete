(function (angular) {
    'use strict';
    angular.module('circle-completion', [])
        .directive('circleComplete',
        ['$timeout', '$window',
            function ($timeout, $window) {
                    return {
                        restrict: 'EA',
                        scope: {
                            lineOptions: '=',
                            textOptions: '=',
                            percentOptions: '=',
                            backgroundColor: '=',
                            callback: '&?'
                        },
                        link: function($scope, element, attrs) {
                            var canvas, ctx, radius, textHolder, span, subtext, size;

                            function setOptions() {
                                $scope.lineOptions.width = $scope.lineOptions.width || 5;
                                $scope.lineOptions.color = $scope.lineOptions.color || 'white';
                                $scope.lineOptions.cap = $scope.lineOptions.cap || 'butt';  //butt, round, square
                                $scope.lineOptions.opacity = $scope.lineOptions.opacity || 0.3;

                                $scope.textOptions.value = $scope.textOptions.value || 'Complete';
                                $scope.textOptions.color = $scope.textOptions.color || 'white';

                                $scope.percentOptions.value = $scope.percentOptions.value || 100;
                                $scope.percentOptions.color = $scope.percentOptions.color || 'white';

                                $scope.backgroundColor = $scope.backgroundColor || 'transparent';
                            }

                            $scope.$watch('percentOptions.value',
                                function () {
                                    element.html('');
                                    createElement();
                                    updateCompletionCircle();
                                    if ($scope.percentOptions.value === 100
                                        && $scope.callback !== undefined)
                                    {
                                        $scope.callback();
                                    }
                                }, true
                            );

                            $scope.getElementWidth = function () {
                                return element.width();
                            };

                            $scope.$watch($scope.getElementWidth,
                                function () {
                                    size = element.width(),
                                    setOptions();
                                    element.html('');
                                    createElement();
                                    updateCompletionCircle();
                                }, true
                            );

                            function createElement() {
                                element.css('position', 'relative')
                                    .css('height', size + 'px')
                                    .css('margin-top', '3px')
                                    .css('margin-left', '3px')
                                    .css('display', 'inline-block');

                                
                                canvas = angular.element('<canvas/>')
                                    .css('display', 'block')
                                    .css('position', 'absolute')
                                    .css('top', '0')
                                    .css('left', '0');
                                canvas[0].width = (size);
                                canvas[0].height = (size);

                                textHolder = angular.element('<div/>')
                                    .css('position', 'absolute')
                                    .css('padding-top', size * .32 + 'px')
                                    .css('font-family', 'Roboto')
                                    .css('font-weight', '100');

                                span = angular.element('<span/>')
                                    .html($scope.percentOptions.value + '%')
                                    .css('color', $scope.percentOptions.color)
                                    .css('display', 'block')
                                    .css('line-height', size * .25 + 'px')
                                    .css('text-align', 'center')
                                    .css('width', size + 'px')
                                    .css('font-size', size * .25 + 'px')
                                    .css('font-weight', '100')
                                    .css('margin-left', '5px');

                                subtext = angular.element('<span/>')
                                    .html($scope.textOptions.value)
                                    .css('color', $scope.textOptions.color)
                                    .css('display', 'block')
                                    .css('line-height', size * .1 + 'px')
                                    .css('text-align', 'center')
                                    .css('width', size + 'px')
                                    .css('font-size', size * .1 + 'px');


                                if (typeof (G_vmlCanvasManager) !== 'undefined') {
                                    G_vmlCanvasManager.initElement(canvas);
                                }

                                textHolder.append(span);
                                textHolder.append(subtext);
                                element.append(canvas);
                                element.append(textHolder);

                                ctx = canvas[0].getContext('2d');

                                ctx.translate(size / 2, size / 2); // change center
                                ctx.rotate((-1 / 2) * Math.PI); // rotate -90 deg
                                radius = Math.max(0,(size - $scope.lineOptions.width) / 2);
                            }

                            function updatePercentageNumber() {
                                if (span === undefined) {
                                    return;
                                }
                                span.html($scope.percentOptions.value + '%');
                            }

                            function updateCompletionCircle() {
                                if (span === undefined) {
                                    return;
                                }
                                // clear the canvas for redrawing
                                ctx.save();
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
                                ctx.restore();

                                drawCircle($scope.lineOptions.color, $scope.lineOptions.width, 100 / 100, $scope.lineOptions.opacity, 'butt');
                                drawCircle($scope.lineOptions.color, $scope.lineOptions.width, $scope.percentOptions.value / 100, 1, $scope.lineOptions.cap);
                            }

                            var drawCircle = function(color, lineWidth, percent, opacity, lineCap) {
                                percent = Math.min(Math.max(0, percent || 1), 1);
                                ctx.beginPath();
                                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                                ctx.strokeStyle = color;
                                ctx.fillStyle = $scope.backgroundColor;
                                ctx.fill();
                                ctx.lineCap = lineCap;
                                ctx.lineWidth = lineWidth;
                                ctx.globalAlpha = opacity;
                                ctx.stroke();
                            };
                        }
                    }
                }
            ]);
})(window.angular);