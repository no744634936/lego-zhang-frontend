test('test common equal',()=>{
    expect(2+2).toBe(4)
})

test('test common not equal',()=>{
    expect(2+2).not.toBe(5)
})
test('test to be true or false',()=>{
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

//number
test('test to be true or false',()=>{
    expect(3).toBeGreaterThan(1)
    expect(2).toBeLessThan(5)
})

// string
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});



// Arrays and iterables
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
});


//object
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

// exception
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}
  
test('compiling android goes as expected', () => {
expect(() => compileAndroidCode()).toThrow();
expect(() => compileAndroidCode()).toThrow(Error);

// You can also use the exact error message or a regexp
expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
expect(() => compileAndroidCode()).toThrow(/JDK/);
});