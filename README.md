# NG(X) Click Out

A more performant way to trigger events when an element is clicked away from. By only initializing event listeners when an element is first interacted with, or whenever you so choose, preformance is greatly improved over other methods.

## Installation

NPM: 

```
npm i npx-click-out
```

Yarn: 

```
yarn add npx-click-out
```

## Usage:

```
  <div id="parent">
      <div id="inner-content" (clickOut)="handleClick()">
        Inner Content
      </div>
      <div id="outer-content">
        Outer Content
      </div>
  </div>
```

## Events

| Event    | description |
| -------- | ----------- |
| clickOut | Event fired when an initialized element is clicked outside of. |
| init     | Event fired when an element is initialized and ready to be clicked out of. |
