# Axioms _(@zefiros-software/axioms)_

<p>
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/zefiros-software/axioms">
  <img alt="Version" src="https://img.shields.io/github/package-json/v/zefiros-software/axioms" />
  <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/zefiros-software/axioms">
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> The art of doing mathematics consists in finding that special case which contains all the germs of generality.
>
> -   David Hilbert

Axioms is a library of *small* composable functions, providing functional programming functionality to regular typescript code.

Writing typesafe code shouldn't be hard. However, writing generic functions to do so *is*. Axioms do the hard work for you. The library is entirely tree shakeable and small as we can make it.

## Table of Contents

<!-- toc -->

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Alternative projects](#alternative-projects)
- [When not to use Axioms?](#when-not-to-use-axioms)
- [License](#license)

<!-- tocstop -->

## Install

Install Axioms using [`npm`](https://www.npmjs.com/):

```console
 $ npm install @zefiros-software/axioms
```

## Alternative projects

In no particular order, the following libraries try to solve similar problems (albeit very different):

- [`Lodash`](https://github.com/lodash/lodash); works very well but defines a more polymorphic interface than we'd like. Also, tree-shaking is difficult without using different versions of this library.
- [`Rambda`](https://ramdajs.com/)
- The list goes on...

PR's are very welcome if you think your project is missing here.

## When not to use Axioms?

Axioms define a very opinionated interface and aren't shy about it. Not everyone will like this.
Although the library is tested, picking a more used alternative will provide more stability.
The current implementation is a WIP; interfaces might change. Functions may get removed if they do not provide enough use. We aim to make every function to be replaceable by a lot of alternatives readily available, but we cannot guarantee this.

## License

Axioms is [MIT licensed](./LICENSE).
