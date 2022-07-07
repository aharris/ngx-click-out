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

### Import the Module:

```ts
import { NgxClickOutModule } from 'ngx-click-out';

@NgModule({
  ...
  imports: [
    ...
    NgxClickOutModule
    ...
  ],
  ...
})
export class AppModule { }
```

### Add the `out` event.

```html
  <div id="parent">
      <div id="inner-content" (out)="handleClickOut()">
        Inner Content
      </div>
      <div id="outer-content">
        Outer Content
      </div>
  </div>
```

## Inputs

| Event     | Type     | Default                              | Description                         |
| --------- | -------- | ------------------------------------ | ----------------------------------- |
| outEvents | string[] | `['click', 'touchstart', 'focusin']` | Array of event names that will fire |

## Events

| Event  | description |
| ------ | ----------- |
| in     | Event fired when an element is initialized and ready to be clicked out of. |
| out    | Event fired when an initialized element is clicked outside of.             |
