const cachedAPICall = (time) => {
    const cache = {};

    return async function(url, config={}) {
        const key = `${url}${JSON.stringify(config)}`;
        const entry = cache[key];
        if (!entry || Date.now() > entry.expiry) {
            // Need to make a fresh API call
            console.log('making a fresh call');
            try {
                let data = await fetch(url);
                data = await data.json();
                cache[key] = {data, expiry: Date.now() + time}
            }
            catch (e) {
                console.error(e);
            }
        }

        return cache[key].data;
        // Or you can use promise instead of async/await:
        // return fetch(url).then((data) => data.json).catch(error => console.error(e))
    }

};

const call = cachedAPICall(1500); // cache should last for 1500ms
call('https://jsonplaceholder.typicode.com/todos/1', {}).then((data) => console.log(data));
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((data) => console.log(data));
}, 800); // After 800ms, make the call - so cache should be returned, not a new call