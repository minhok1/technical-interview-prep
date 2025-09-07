class managePubSub {
    constructor() {
        this.subscribers = {}; // this will have event as the key and the callback function list as the value
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
        const index = this.subscribers.length - 1;
        const subscribers = this.subscribers; // because the function can't access "this"

        return {
            unsubscribe: function() {
                subscribers[event].splice(index, 1);
            }
        }
    }

    publish(event, data) {
        if (!this.subscribers[event]) {
            return;
        }
        this.subscribers[event].forEach((subscriberCallback) => subscriberCallback(data)) // Go through all the callback list with the data
    }
}

class Cat {
    constructor(name, interests) {
      this.name = name;
      this.interests = interests;
      this.unsubscribe = {};
    }
  
    addUnsubscription(keyName, method) {
        this.unsubscribe[keyName] = method; // We need this because when subscribe() returns the unsubscribe function, you need to save it to this particular cat
    }
}

const catDomPubSub = new managePubSub();

const cat1 = new Cat('Midnight', ['climb trees', 'hunt', 'weather']);
const cat2 = new Cat('Bear', ['humour', 'weather', 'camera skills']);
const cat3 = new Cat('Smokey', ['hunt', 'camera skills']);
const allCat = [cat1, cat2, cat3];

allCat.forEach((singleCat, idx) => {
  const { name, interests } = singleCat;
  interests.forEach(interest => {
    const { unsubscribe } = catDomPubSub.subscribe(interest, data =>
      printInterestReceived(name, interest, data)
    );
    allCat[idx].addUnsubscription(interest, unsubscribe);
  });
});

function printInterestReceived(name, interest, data) {
  console.log(`${name} has received information for ${interest}: ${data}`);
}

catDomPubSub.publish('climb trees', 'Learn coordination');
catDomPubSub.publish('weather', 'Might rain tomorrow, stay indoors!');
catDomPubSub.publish(
  'hunt',
  'Predicted migration of house rats tomorrow, stay alert'
);

cat1.unsubscribe.hunt();

catDomPubSub.publish('hunt', 'Sharpen your claws');


