# angular-circle-complete

Progress circle for angular

## Include
Include dependecies
```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
```

Include files
```html
    <script src="../src/circle-complete.js"></script>
```

### Usage
Inlucde in your app
```js
var app = angular.module('App', ['circle-completion']);
```

Insert in your html
```html
<circle-complete
	percent-options="{value:percentComplete1, color:'#ababab'}"
	line-options="{width: 10, color:'rgb(100,255,100)', cap:'butt', opacity: 0.3}"
	text-options="{value:'Complete', color:'white'}"
	background-color="'rgb(51,51,200)'"
	callback="callBackFunction(message1, message2)">
</circle-complete>
```

### Customize

set the html Attributes:

```percentOptions```:
	```value```: int - value from 0-100
	```color```: hex, rgb, or css color - color of text displaying percentage

```lineOptions```:
	```width```: int - width of line displaying percentage
	```color```: hex, rgb, or css color - color of text displaying percentage
	```cap```: canvas linecap - butt, round, square
	```opacity```: int, value from 0-1 - opacity of line path background

```textOptions```:
	```value```: string - text to display under percentage
	```color```: hex, rgb, or css color - color of text displaying under percentage

```backgroundColor```: hex, rgb, or css color - color of center circle

```callback```: function - called when ```percentOptions.value``` reaches 100
