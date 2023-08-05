jwt : require('jsonwebtoken')
try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, 'shhhh');
    const { username } = decoded;

    // ...rest of your code
    document.querySelector('.name1').innerText = username

} catch (error) {
    console.error('Error decoding token:', error);
    // Handle the error appropriately
}

