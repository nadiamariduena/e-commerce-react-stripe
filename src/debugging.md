## This is the first time i debug, so i dont really know if i did it correctly(but all the warning are gone)

#### But since its an backend app, i will have to check with my teacher to see if all is secure.

<br>
<br>

### the warning ⚠️

<br>

```javascript
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

<br>

#### Since the warning indicated the lines and the file (inside the console) from where the problem originated.

- I just had to try a couple of things

- The solution was to add the token inside the array: **[checkoutToken.id]**

```javascript
//
//
// Countries
useEffect(() => {
  fetchShippingCountries(checkoutToken.id);
  // This worked for me
  return () => {
    setShippingCountries({}); // This worked for me
  };
}, [checkoutToken.id]);

//
//
//Subdivisions
useEffect(() => {
  if (shippingCountry) fetchSubdivisions(shippingCountry);
}, [shippingCountry]);

//
// Options
useEffect(() => {
  if (shippingSubdivision)
    fetchShippingOptions(
      checkoutToken.id,
      shippingCountry,
      shippingSubdivision
    );
}, [shippingSubdivision, checkoutToken.id, shippingCountry]);

//
//
//
```
