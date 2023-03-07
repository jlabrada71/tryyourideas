<template>
  <div ref="myid">
    <div class="site-wrapper">
      <section class="article-wrapper">
        <div class="article-container">
          <div class="article-block">
            <div class="entry-content">
              <h1>HTML Range Slider</h1>
              <p>The ultimate guide to creating the Ranger Slider using HTML, CSS and jQuery.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="range-slider-wrapper">
        <div class="range-slider-container">
          <div class="range-slider-block">
            <div id="range-sliders" class="range-sliders">
              <div class="range-slider-group range-slider-group-red">
                <h2 class="range-label range-label-red">Red</h2>
                <input type="range" min="0" max="255" value="155" data-color="#f00" class="range-slider range-slider-red" id="range-slider-red" />
                <input type="number" min="0" max="255" value="155" class="input-slider input-slider-red" id="input-slider-red" />
              </div>
              <div class="range-slider-group range-slider-group-green">
                <h2 class="range-label range-label-green">Green</h2>
                <input type="range" min="0" max="255" value="211" data-color="#090" class="range-slider range-slider-green" id="range-slider-green" />
                <input type="number" min="0" max="255" value="211" class="input-slider input-slider-green" id="input-slider-green" />
              </div>
              <div class="range-slider-group range-slider-group-blue">
                <h2 class="range-label range-label-blue">Blue</h2>
                <input type="range" min="0" max="255" value="121" data-color="#00f" class="range-slider range-slider-blue" id="range-slider-blue" />
                <input type="number" min="0" max="255" value="121" class="input-slider input-slider-blue" id="input-slider-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div class="credits"><a href="https://htmlcssfreebies.com/html-range-slider/" target="_blank">HTML Range Slider</a> by HTMLCSSFreebies.</div>
      </footer>
    </div>
  </div>
  
</template>

<script setup>

  import { onMounted, ref } from 'vue'
  //
// HTML Range Slider
//

const myid = ref(null)

function ge(className) {
  const items = myid.value.getElementsByClassName(className);
  if (items.length) return items[0]
  return null
}


	// Variables
	
	

	// Bg Init
	const bgInit = ( $this, val = 0, min = 0, max = 255, color = '#f00' ) => {
		// Background Change
		const valBg = ( val - min ) / ( max - min ) * 100;
		$this.css( 'background', `linear-gradient(to right, ${ color } 0%, ${ color } ${ valBg }%, #fff ${ valBg }%, white 100%)` );
	};

	// Pre Init
	const preInit = () => {
		const rangeSliders = [ 'range-slider-red', 'range-slider-green', 'range-slider-blue' ];
		rangeSliders.forEach( function( key ) {
			// Background Change
			const $this = ge( `#${ key }` );
			const val = Number( $this.val() );
			const min = Number( $this.attr( 'min' ) );
			const max = Number( $this.attr( 'max' ) );
			const color = $this.data( 'color' );
			bgInit( $this, val, min, max, color );
		} );
	};

	// Toggle Class
	const init = () => {
		// Slider Range Change or Input
    const $rangeSlider = ge( '#range-sliders .range-slider' );
		$rangeSlider.off( 'change input' ).on( 'change input', function( e ) {
			// Prevent Default
			e.preventDefault();
			e.stopPropagation();

			// Background Change
			const $this = ge( this );
			const val = Number( $this.val() );
			const min = Number( $this.attr( 'min' ) );
			const max = Number( $this.attr( 'max' ) );
			const color = $this.data( 'color' );
			bgInit( $this, val, min, max, color );

			// Assign value to slider input
			$this.next().val( ge( this ).val() );
		} );

		// Input Slider Input
    const $inputSlider = ge( '#range-sliders .input-slider' );
		$inputSlider.off( 'input' ).on( 'input', function( e ) {
			// Prevent Default
			e.preventDefault();
			e.stopPropagation();

			// Background Change
			const $thisInput = ge( this );
			let val = Number( $thisInput.val() );
			const min = Number( $thisInput.attr( 'min' ) );
			const max = Number( $thisInput.attr( 'max' ) );
			//const color = $this.data( 'color' );

			// Max Validation
			if ( val > max ) {
				val = max;
				$thisInput.val( val );
			}

			// Min Validation
			if ( val < min ) {
				val = min;
				$thisInput.val( val );
			}

			// Background Change
			const $this = $thisInput.prev();
			const color = $this.data( 'color' );
			bgInit( $this, val, min, max, color );

			// Assign value to slider range.
			$this.val( val );
		} );
	};

  onMounted(() => {
    preInit();
		init();
  })

</script>

<style scoped>
  /**
 * Fonts
 */

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/**
 * Reset
 */
*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	font-family: sans-serif;
	line-height: 1.15;
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	padding: 0;
	margin: 0;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
}

body {
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	padding: 0;
	margin: 0;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	background-color: #f2f2f2;
	color: #1a1a1a;
	font-family: "Source Sans Pro", sans-serif;
	font-size: 1.1rem;
	line-height: 1.5;
}

p, ol, ul, li, dl, dt, dd,
blockquote,
figure,
fieldset,
form,
legend,
textarea,
pre,
iframe,
hr,
h1, h2, h3, h4, h5, h6 {
	padding: 0;
	margin: 0;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
}

/**
 * Global Rules
 */
h1, h2, h3, h4, h5, h6 {
	color: #0d0d0d;
	font-family: Roboto, sans-serif;
	line-height: 1.2;
	word-wrap: break-word;
}

h1 {
	font-size: 40px;
}

h2 {
	font-size: 32px;
}

a,
a:visited {
	background-color: transparent;
	color: #0067b8;
	text-decoration: none;
	border-bottom: 1px dotted;
}

a:hover,
a:active {
	border-bottom: none;
	outline: 0;
}

a:focus {
	border-bottom: none;
	outline: thin dotted;
}

a img {
	border: 0;
}

.entry-content > *:not(:last-child) {
	margin-bottom: 1rem;
}

footer {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 2rem;
}

footer .credits {
	font-size: 1rem;
}

/**
 * Article Container
 */
.article-container {
	padding: 2rem;
}

/**
 * Article Block
 */
.article-block {
	text-align: center;
}

.article-block .entry-content > p {
	color: #666;
}

/**
 * Range Slider Container
 */
.range-slider-container {
	padding: 2rem;
}

/**
 * Range Slider Block
 */
.range-slider-block {
	display: flex;
	align-items: center;
	justify-content: center;
}

/**
 * Range Sliders
 */
.range-sliders {
	width: 100%;
	background-color: #fff;
	padding: 1.5rem;
}

.range-sliders > *:not(:last-child) {
	margin-bottom: 1.5rem;
}

.range-sliders input[type=range] {
	width: 100%;
	background: linear-gradient(to right, #f00 0%, #f00 50%, #fff 50%, #fff 100%);
	border-radius: 8px;
	height: 2px;
	outline: none;
	-webkit-appearance: none;
}

.range-sliders input[type=range]:focus {
	outline: none;
}

.range-sliders input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 1px;
	cursor: pointer;
	box-shadow: none;
	background-color: #e6e6e6;
	border-radius: 0;
}

.range-sliders input[type=range]::-moz-range-track {
	width: 100%;
	height: 1px;
	cursor: pointer;
	box-shadow: none;
	background-color: #ccc;
	border-radius: 0;
}

.range-sliders input[type=range]::-webkit-slider-thumb {
	box-shadow: none;
	height: 30px;
	width: 12px;
	border-color: transparent;
	border-radius: 22px;
	background-color: #999;
	cursor: ew-resize;
	-webkit-appearance: none;
	margin-top: -15px;
}

.range-sliders input[type=range]::-moz-range-thumb {
	box-shadow: none;
	height: 30px;
	width: 12px;
	border-color: transparent;
	border-radius: 22px;
	background-color: #999;
	cursor: ew-resize;
	-webkit-appearance: none;
	margin-top: -15px;
}

.range-sliders input[type=range]::-moz-focus-outer {
	border: 0;
}

.range-sliders input[type=range].range-slider-red {
	background: linear-gradient(to right, #f00 0%, #f00 50%, #fff 50%, #fff 100%);
}

.range-sliders input[type=range].range-slider-red::-webkit-slider-runnable-track {
	background-color: rgba(255, 0, 0, 0.1);
}

.range-sliders input[type=range].range-slider-red::-moz-range-track {
	background-color: rgba(255, 0, 0, 0.1);
}

.range-sliders input[type=range].range-slider-red::-webkit-slider-thumb {
	background-color: #f00;
}

.range-sliders input[type=range].range-slider-red::-moz-range-thumb {
	background-color: #f00;
}

.range-sliders input[type=range].range-slider-green {
	background: linear-gradient(to right, #090 0%, #090 50%, #fff 50%, #fff 100%);
}

.range-sliders input[type=range].range-slider-green::-webkit-slider-runnable-track {
	background-color: rgba(0, 153, 0, 0.1);
}

.range-sliders input[type=range].range-slider-green::-moz-range-track {
	background-color: rgba(0, 153, 0, 0.1);
}

.range-sliders input[type=range].range-slider-green::-webkit-slider-thumb {
	background-color: #090;
}

.range-sliders input[type=range].range-slider-green::-moz-range-thumb {
	background-color: #090;
}

.range-sliders input[type=range].range-slider-blue {
	background: linear-gradient(to right, #00f 0%, #00f 50%, #fff 50%, #fff 100%);
}

.range-sliders input[type=range].range-slider-blue::-webkit-slider-runnable-track {
	background-color: rgba(0, 0, 255, 0.1);
}

.range-sliders input[type=range].range-slider-blue::-moz-range-track {
	background-color: rgba(0, 0, 255, 0.1);
}

.range-sliders input[type=range].range-slider-blue::-webkit-slider-thumb {
	background-color: #00f;
}

.range-sliders input[type=range].range-slider-blue::-moz-range-thumb {
	background-color: #00f;
}

.range-sliders .input-slider {
	border: 1px solid #e6e6e6;
	padding: 0.5rem;
	-moz-appearance: textfield;
}

.range-sliders .input-slider::-webkit-outer-spin-button,
.range-sliders .input-slider::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.range-sliders .range-slider-group {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
}

.range-sliders .range-slider-group .range-label {
	width: 100%;
	font-size: 1rem;
	margin-bottom: 0.5rem;
}

.range-sliders .range-slider-group .range-slider {
	width: calc(100% - 60px);
}

.range-sliders .range-slider-group .input-slider {
	width: 45px;
}
@media (min-width: 576px) {

	.range-sliders {
		width: 500px;
		padding: 3rem;
	}
}
@media (min-width: 768px) {

	body {
		font-size: 1.125rem;
	}

	.range-slider-container {
		padding: 4rem 4rem;
	}
}
</style>