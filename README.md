# `transpose.js` - Chord Transposition made simple

This is a simple utility for transposing the chords in a given composition. Once the CSS selector for the element that contains the chord, and the target transposition index is provided, the library can transpose the chord defined within the said element, to the given transposition index. Transposition index `i` is in the range `[-12 <= i <= +12]`.

## Getting Started

### Using npm
```
import { Transpose } from '@_00407/transpose.js';

const t = new Transpose();
t.transpose(+1);
```

### Plain JS

```
<script type="text/javascript" src="https://kanchana.senadheera.net/transpose.js/dist/transpose.min.js"></script> <!-- Transposer instance will be initialized in the window object -->

<button class="transpose transpose-down" onclick="Transposer.transpose(-1)">-1</button>
<button class="transpose transpose-reset" onclick="Transposer.transpose(0)">R</button>
<button class="transpose transpose-up" onclick="Transposer.transpose(+1)">+1</button>
```

### Prerequisites

N/A

### Installing

#### Using npm

```
npm install @_000407/singlish.js
```

#### Plain JS

```
<script type="text/javascript" src="https://kanchana.senadheera.net/transpose.js/dist/transpose.min.js"></script>
```

### Configuration

You may customize the behavior of transposed output rendering, selection of containers of chords etc as follows.

 1. During instantiation - accepts an object contains configuration
 2. Calling `init` method of an instance - accepts an object contains configuration

| Property   | Description                                           | Type       | Req/Opt  | Default         |
|------------|-------------------------------------------------------|------------|----------|-----------------|
| `selector` | CSS selector of the elements that contain the chords. | `string`   | Optional | `span.chord`    |
| `render`   | Function that renders the transposed chord output.    | `function` | Optional | *see Rendering* |

#### Rendering

By default, the rendering is done using the following function.

```
function(offset) {
  for(let c of document.querySelectorAll(this.selector)) {
    c.innerHTML = this.transposeChord(c.innerHTML, offset);
  }
}
```

#### Example

```
// During construction
const t = new Transposer({
    selector: "span.chord",
    render: function(offset) {
        console.log("Overridden version");
        for(let c of document.querySelectorAll(this.selector)) {
            c.innerHTML = this.transposeChord(c.innerHTML, offset);
        }
    }
});

// Using init method
t.init({
    selector: "span.chord",
    render: function(offset) {
        console.log("Overridden version");
        for(let c of document.querySelectorAll(this.selector)) {
            c.innerHTML = this.transposeChord(c.innerHTML, offset);
        }
    }
});
```

## Running the tests

N/A

### Break down into end to end tests

N/A

## Deployment

N/A

## Built With

N/A

## Contributing

N/A

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/000407/singlish.js/tags). 

## Authors

* **Kanchana Senadheera** - *Initial work* - [000407](https://github.com/000407)

See also the list of [contributors](https://github.com/000407/transpose.js/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

N/A
