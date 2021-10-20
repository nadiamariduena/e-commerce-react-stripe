## Topics I came across while looking for solutions to certain errors

[Why Are There So Many Curly Brackets{} in JavaScript?](https://medium.com/swlh/why-are-there-so-many-curly-brackets-in-javascript-49752253b6b8)

### example:

```javascript
handleChange = (event, { name, value }) => {
  this.setState({ [name]: value });
};
```

<br>

In JavaScript, when dealing with complex objects that contain multiple attributes, **we can use de-structuring to access only the items we want to focus** on. In the above code, the function handleChange is invoked when a Semantic UI React input box is entered with text. **The function is passed the event and data**. There may be many attribute in the data object but if we only **care about the name and value**,

> we only need say **{ name, value }** while ignoring the rest.

Just like in the preceding example, there is also a setState function here. The pair encases the object that represents the state, **which can be identified by the presence of a key (the one suffixed by a “:”) and value (the one follows the “:”).**

<br>

### theres much more, this is just a little example...

[Why Are There So Many Curly Brackets{} in JavaScript?](https://medium.com/swlh/why-are-there-so-many-curly-brackets-in-javascript-49752253b6b8)
