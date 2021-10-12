## 1. Install the dependencies

```javascript
npm install @material-ui/core @material-ui/icons @chec/commerce.js @stripe/react-stripe-js @stripe/stripe-js react-router-dom react-hook-form

//  @chec/commerce.js
// This dependency is going to be the most important one,
// as it s going to manage our ecommerce
```

 <br>

### 2. Delete the entire src folder

### 3. Create a new src folder

### 4. Create the index.js

- inside the new created <u>src folder</u> add an **index.js**

```javascript
import React from "react";
import ReactDOM from "react-dom";

//
import App from "./App";
import "./scss/_main.scss";

//
//
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

<br>

### 5. create the App.js

- If you have the snippets installed, type: rafc to generate the functional component
- If you dont have it, go to the extensions and look for: auto Rename tag,
- Bracket Pair colorized, which will add some colors to your code
- But the one we need is: ES7 React/Redux/GraphQL/React-Native snippets

<br>

```javascript
import React from "react";

export const App = () => {
  return <div>E-commerce</div>;
};
```
